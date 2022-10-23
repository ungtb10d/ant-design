---
order: 1
title: 跨页选数据
---

当需要对表格／列表的数据进行跨分页器选择时，结合『Alert』来实现。

1.当 Tag 或者表格中的文字过长时，可以使用 `limitTextLength` 限制所显示的长度，超出部份显示为 “...”。

```jsx
import { Table, Alert, Tag } from 'antd';

const mockData = [];
for (let i = 1; i < 100; i++) {
  mockData.push({
    database: `Ant-Dlist-${i}`,
    detail: '我是内容我是内容我是内容',
    key: i,
  });
}

function limitTextLength(text, length) {
  if (text.length > length) {
    return `${text.slice(0, length)}...`;
  }

  return text;
}

class PagedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRowKeys: [],
    };

    // 在 constructor 中绑定 `this` 到 handler 上，确保 `this` 的指向。
    ['handleSelected', 'handleClearAll'].forEach((method) => {
      this[method] = this[method].bind(this);
    });

    // columns 在 constructor 中初始化，保证 `column.render` 可以访问 `this`，同时不会重复生成。
    this.columns = [{
      title: '数据库名称',
      dataIndex: 'database',
      key: 'database',
    }, {
      title: '详情',
      dataIndex: 'detail',
      key: 'detail',
    }, {
      title: '操作',
      key: 'operation',
      render: () => {
        return (
          <span>
            <a>操作1</a>
            <span className="ant-divider"></span>
            <a>更多</a>
          </span>
        );
      },
    }];
    this.pagination = {
      total: mockData.length,
      showQuickJumper: true,
      pageSize: 5,
      defaultCurrent: 6,
    };
  }

  handleSelected(selectedRowKeys) {
    this.setState({ selectedRowKeys });
  }

  handleCloseTag(removedKey) {
    const selectedRowKeys = this.state.selectedRowKeys
      .filter((selectedKey) => selectedKey !== removedKey);
    this.setState({ selectedRowKeys });
  }

  handleClearAll() {
    this.setState({ selectedRowKeys: [] });
  }

  getSelectedRecords() {
    const selectedRowKeys = this.state.selectedRowKeys;
    return this.props.dataSource
      .filter((record) => selectedRowKeys.indexOf(record.key) > -1);
  }

  render() {
    const props = this.props;
    const state = this.state;

    const message = this.getSelectedRecords()
      .map((record) => {
        const key = record.key;
        const content = record.database;
        return (
          <Tag color="blue" key={key}
            closable onClose={() => this.handleCloseTag(key)}>
            { limitTextLength(content, 10) }
          </Tag>
        );
      });
    message.push(<a className="clear-all" onClick={this.handleClearAll} key="clear">清空</a>);

    const rowSelection = {
      selectedRowKeys: state.selectedRowKeys,
      onChange: this.handleSelected,
    };

    return (
      <div className="paged-table">
        { message.length > 1 ? <Alert type="info" message={message} /> : null }
        <Table columns={this.columns} pagination={this.pagination}
          rowSelection={rowSelection}
          dataSource={props.dataSource} />
      </div>
    );
  }
}

PagedTable.propTypes = {
  dataSource: React.PropTypes.arrayOf(React.PropTypes.object),
};

ReactDOM.render(
  <PagedTable dataSource={mockData} />,
  mountNode
);
```

```css
.paged-table .ant-alert {
  position: relative;
  padding-right: 35px;
}
.clear-all {
  position: absolute;
  top: 8px;
  right: 8px;
  line-height: 22px;
}
```
