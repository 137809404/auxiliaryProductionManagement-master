/* eslint-disable */
require('script-loader!file-saver');
import XLSX from 'xlsx-style'

function datenum(v, date1904) {
  if (date1904) v += 1462;
  var epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function sheet_from_array_of_arrays(data, opts) {
  console.log(data);
  var ws = {};
  var range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  };
  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      var cell = {
        v: data[R][C]
      };
      if (cell.v == null) continue;
      var cell_ref = XLSX.utils.encode_cell({
        c: C,
        r: R
      });

      if (typeof cell.v === 'number') cell.t = 'n';
      else if (typeof cell.v === 'boolean') cell.t = 'b';
      else if (cell.v instanceof Date) {
        cell.t = 'n';
        cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      } else cell.t = 's';
      ws[cell_ref] = cell;
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  console.log(ws)
  return ws;
}

function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}

function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}
//由Table导出Excel
/*
function generateArray(table) {
  var out = [];
  var rows = table.querySelectorAll('tr');
  var ranges = [];
  for (var R = 0; R < rows.length; ++R) {
    var outRow = [];
    var row = rows[R];
    var columns = row.querySelectorAll('td');
    for (var C = 0; C < columns.length; ++C) {
      var cell = columns[C];
      var colspan = cell.getAttribute('colspan');
      var rowspan = cell.getAttribute('rowspan');
      var cellValue = cell.innerText;
      if (cellValue !== "" && cellValue == +cellValue) cellValue = +cellValue;

      //Skip ranges
      ranges.forEach(function (range) {
        if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
          for (var i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
        }
      });

      //Handle Row Span
      if (rowspan || colspan) {
        rowspan = rowspan || 1;
        colspan = colspan || 1;
        ranges.push({
          s: {
            r: R,
            c: outRow.length
          },
          e: {
            r: R + rowspan - 1,
            c: outRow.length + colspan - 1
          }
        });
      }
      ;

      //Handle Value
      outRow.push(cellValue !== "" ? cellValue : null);

      //Handle Colspan
      if (colspan)
        for (var k = 0; k < colspan - 1; ++k) outRow.push(null);
    }
    out.push(outRow);
  }
  return [out, ranges];
};

export function export_table_to_excel(id) {
  var theTable = document.getElementById(id);
  var oo = generateArray(theTable);
  var ranges = oo[1];

  /!* original data *!/
  var data = oo[0];
  var ws_name = "SheetJS";

  var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);

  /!* add ranges to worksheet *!/
  // ws['!cols'] = ['apple', 'banan'];
  ws['!merges'] = ranges;

  /!* add worksheet to workbook *!/
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  var wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  });

  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), "test.xlsx")
}
*/

//由Json字符串导出Excel
export function export_json_to_excel({
  multiHeader = [],
  header,
  data,
  filename,
  merges = [],
  autoWidth = true,
  colWidth = [],
  bookType = 'xlsx',
  myRowFont = ['A1'] // 哪一行变颜色
} = {}) {
  /* original data */
  filename = filename || 'excel-list'
  data = [...data]
  data.unshift(header);

  for (let i = multiHeader.length - 1; i > -1; i--) {
    data.unshift(multiHeader[i])
  }

  var ws_name = "Sheet1";
  var wb = new Workbook(),
    ws = sheet_from_array_of_arrays(data);

  //合并单元格操作
  if (merges.length > 0) {
    if (!ws['!merges']) ws['!merges'] = [];
    merges.forEach(item => {
      ws['!merges'].push(XLSX.utils.decode_range(item))
    })
  }

  //自动设置列宽度
  if (autoWidth) {
    /*设置worksheet每列的最大宽度*/
    const colWidth = data.map(row => row.map(val => {
      /*先判断是否为null/undefined*/
      if (val == null) {
        return {
          'wch': 10
        };
      }
      /*再判断是否为中文*/
      else if (val.toString().charCodeAt(0) > 255) {
        return {
          'wch': val.toString().length * 2
        };
      } else {
        return {
          'wch': val.toString().length
        };
      }
    }))
    /*以第一行为初始值*/
    let result = colWidth[0];
    for (let i = 1; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {
        if (result[j]['wch'] < colWidth[i][j]['wch']) {
          result[j]['wch'] = colWidth[i][j]['wch'];
        }
      }
    }
    ws['!cols'] = result;
  }

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;
  var dataInfo = wb.Sheets[wb.SheetNames[0]];

  //全包外框样式
  const borderAll = {
    top: {
      style: 'thin'
    },
    bottom: {
      style: 'thin'
    },
    left: {
      style: 'thin'
    },
    right: {
      style: 'thin'
    }
  };
  //给所有单元格加上边框
  for (var i in dataInfo) {
    if (i == '!ref' || i == '!merges' || i == '!cols' || i == 'A1') {

    } else {
      dataInfo[i + ''].s = {
        border: borderAll,
        font: {
          name: '宋体',
          sz: 18,
          color: { rgb: '000000' },
          bold: false,
          italic: false,
          underline: false
        },
        alignment: {
          horizontal: 'center',
          vertical: 'center'
        },
      }
    }
  }
  //设置列宽（不能设置行高，xlsx-style基础版没这个功能→_→）
  dataInfo['!cols'] = colWidth
  //dataInfo['!rows'] =
  // 去掉标题边框
  let arr = ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1", "J1", "K1", "L1", "M1", "N1", "O1", "P1", "Q1", "R1", "S1", "T1", "U1", "V1", "W1", "X1", "Y1", "Z1"];
  arr.some(function (v) {
    let a = merges[0].split(':')
    if (v == a[1]) {
      dataInfo[v].s = {}
      return true;
    } else {
      dataInfo[v].s = {}
    }
  })

  //设置主标题样式
  const tableTitleFont = {
    font: {
      name: '宋体',
      sz: 18,
      color: { rgb: '000000' },
      bold: false,
      italic: false,
      underline: false
    },
    alignment: {
      horizontal: 'center',
      vertical: 'center'
    },
    border: borderAll
  }
    dataInfo["A3"].s = {
    font: {
      name: '宋体',
      sz: 18,
      color: {rgb: "FF0000"},
      bold: false,
      italic: false,
      underline: false
    },
    alignment: {
      horizontal: "center",
      vertical: "center"
    },
      border: borderAll
    /*fill: {
      fgColor: {
        rgb: '76EEC6'
      }
    }*/
  };
  let bgBlue = {fgColor: {rgb: '76EEC6'}}
  dataInfo['A5'].s.fill = bgBlue;
  dataInfo['B5'].s.fill = bgBlue;
  dataInfo['C5'].s.fill = bgBlue;
  dataInfo['D5'].s.fill = bgBlue;
  let bgYellow = {fgColor: {rgb: 'FFFF00'}}
  dataInfo['D6'].s.fill = bgYellow;
  dataInfo['D7'].s.fill = bgYellow;
  dataInfo['D8'].s.fill = bgYellow;

  //很迷，循环遍历数组和类的时候获取的是索引？？
  for (let b in myRowFont) {
    console.log(myRowFont[b]);
    dataInfo[myRowFont[b]].s = tableTitleFont
  }

  console.log(dataInfo);

  //导出表格
  let wbout = XLSX.write(wb, {
    bookType: bookType,
    bookSST: false,
    type: 'binary'
  });
  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), `${filename}.${bookType}`);
}
