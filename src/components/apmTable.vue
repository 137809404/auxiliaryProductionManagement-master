<template>
  <section class="apm-table">
    <el-table
      @selection-change="handleSelectionChange"
      :data="tableData"
      height="auto"
      header-align="center"
      stripe
    >
      <el-table-column v-if="isSelection" type="selection" width="55"></el-table-column>

      <el-table-column v-if="isIndex" type="index" label="序号" width="50" align="center"></el-table-column>

      <template v-for="item in tableColumn">
        <slot v-if="item.slot" :name="item.slot"></slot>

        <el-table-column
          v-else
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
      </template>
    </el-table>

    <el-pagination
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
    <!-- @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    :current-page="currentPage4"-->
  </section>
</template>

<script>
export default {
  name: 'apm-table',
  props: {
    tableData: { type: Array, required: true },
    tableColumn: { type: Array, required: true },
    isIndex: { type: Boolean, default: false },
    isSelection: { type: Boolean, default: false },
    selectionArr: { type: Array }
  },
  methods: {
    handleSelectionChange (val) {
      this.$emit('update:selectionArr', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.apm-table /deep/ {
  //background-color: $sectionBgColor;
  width: 100%;
  height: 100%;
 // border: 1px solid $sectionBorderColor;
 // border-top: 2px solid $sectionBorderTopColor;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // -----------------------分页
  .el-pager {
    li.active,
    li:hover {
     // color: $menuTextColor;
    }
  }
  .el-pager li.btn-quicknext,
  .el-pager li.btn-quickprev,
  .el-pagination .btn-next,
  .el-pagination .btn-prev {
    background-color: transparent;
    color: black;
  }

  .el-pager li.btn-quicknext:hover,
  .el-pager li.btn-quickprev:hover,
  .el-pagination button:hover {
  //  color: $menuTextColor;
  }
  .el-pagination button:disabled {
    color: black;
  }
  .el-pagination__total,
  .el-pagination__jump {
    color: black;
  }
  .el-pagination {
    width: 100%;
    padding: 10px 0;
    color: black;
    .el-pager li {
      background-color: transparent;
    }
    text-align: center;
  }
  .el-select:hover .el-input__inner {
    border: 1px solid rgba($color: #00a8ff, $alpha: 0.8);
  }
  // -----------------------分页结束
  .el-table {
    flex: 1;
    height: 0;
    background-color: transparent;
    tr,
    th,
    td {
      background-color: transparent;
      color: black;
      padding: 3px 0;
    }
    td,
    th.is-leaf {
      border: none;
    }
    td {
      border-bottom: 1px solid rgba($color: #2995e1, $alpha: 0.4);
      .el-button {
      }
    }
    .el-table-column--selection {
      .cell {
        padding-left: 14px;
      }
    }
  }
  /deep/ .el-table__header {
    background-color: rgba($color: #2c82c2, $alpha: 0.4);
    .has-gutter {
      tr {
        th {
          div {
           // color: $menuTextColor;
          }
        }
      }
    }
  }

  .el-table--striped .el-table__body tr.el-table__row--striped td,
  .el-table--enable-row-hover .el-table__body tr:hover > td,
  .el-table--striped .el-table__body tr.el-table__row--striped td {
    background-color: rgba($color: #060920, $alpha: 0.5);
  }
  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    content: none;
  }
  .el-checkbox__inner {
    background-color: rgb(79, 80, 102);
  }
}
</style>
