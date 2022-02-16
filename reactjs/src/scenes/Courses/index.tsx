/* eslint-disable */

import * as React from 'react';

import { Card, Col, Input, Row, Table,Modal,Button , Dropdown , Menu} from 'antd';
import { inject, observer } from 'mobx-react';

import AppComponentBase from '../../components/AppComponentBase';
import CreateOrUpdateCourse from './components/createOrUpdateCourse';
import { EntityDto } from '../../services/dto/entityDto';
import { L } from '../../lib/abpUtility';
import Stores from '../../stores/storeIdentifier';
import CourseStore from '../../stores/courseStore';
import { FormInstance } from 'antd/lib/form';
import { PlusOutlined , SettingOutlined} from '@ant-design/icons';
import DepartmentStore from '../../stores/departmentStore';

export interface ICourseProps {
  courseStore: CourseStore;
  departmentStore: DepartmentStore;
}

export interface ICourseState {
  modalVisible: boolean; 
  maxResultCount: number;
  skipCount: number;
  userId: number;
  filter: string;
  sortDirection: string;
  sortExpression: string;
}

const confirm = Modal.confirm;
const Search = Input.Search;

@inject(Stores.CourseStore)
@inject(Stores.DepartmentStore)

@observer

class Course extends AppComponentBase<ICourseProps, ICourseState> {
  formRef = React.createRef<FormInstance>();

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    userId: 0,
    filter: '',
    sortDirection: 'ascend',
    sortExpression: 'Name'
  };

  async componentDidMount() {
    await this.getAll();
    await this.getAllDepartments();
  }

  async getAll() {
    await this.props.courseStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter, sorting: this.state.sortExpression, direction: this.state.sortDirection });
  }

  handleTableChange = (pagination: any, filters:any, sorter: any) => {
    let yon = sorter.order === undefined ? 'ascend' : sorter.order;
    let colKey = sorter.columnKey === undefined ? 'Name' : sorter.columnKey;
    this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount!, sortDirection: yon, sortExpression: colKey }, async () => await this.getAll());
  };
  Modal = () => { 
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  async createOrUpdateModalOpen(entityDto: EntityDto) {
    if (entityDto.id === 0) {
      await this.props.courseStore.createUser();
      //await this.props.courseStore.getRoles();
    } else {
      await this.props.courseStore.get(entityDto);
      //await this.props.courseStore.getRoles();
    }

    this.setState({ userId: entityDto.id });
    this.Modal();

    setTimeout(() => {
      this.formRef.current?.setFieldsValue({ ...this.props.courseStore.editCourse });
    }, 100);
  }

  delete(input: EntityDto) {
    const self = this;
    confirm({
      title: 'Do you Want to delete these items?',
      onOk() {
        self.props.courseStore.delete(input);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  handleCreate = () => {
    const form = this.formRef.current;

    form!.validateFields().then(async (values: any) => {
      if (this.state.userId === 0) {
        console.log('values:'+values.departmentId);
        await this.props.courseStore.create(values);
      } else {
        await this.props.courseStore.update({ ...values, id: this.state.userId });
      }

      await this.getAll();
      this.setState({ modalVisible: false });
      form!.resetFields();
    });
  };

  handleSearch = (value: string) => {
    this.setState({ filter: value }, async () => await this.getAll());
    console.log('search value:'+ value);
  };

  
  async getAllDepartments() {
    await this.props.departmentStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
  }
  
  public render() {
    const { courses } = this.props.courseStore;
    const columns = [
      { title: L('Name'), dataIndex: 'name', key: 'Name', sorter: (a:any,b:any) => a.name.localeCompare(b.name), width: 150, render: (text: string) => <div>{text}</div> },
      { title: L('Department'), dataIndex: 'departmentName', key: 'DepartmentName', sorter: (a:any,b:any) => a.departmentName.localeCompare(b.departmentName), width: 150, render: (text: string) => <div>{text}</div> },
      {
        title: L('Actions'),
        width: 150,
        render: (text: string, item: any) => (
          <div>
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu>
                  <Menu.Item onClick={() => this.createOrUpdateModalOpen({ id: item.id })}>{L('Edit')}</Menu.Item>
                  <Menu.Item onClick={() => this.delete({ id: item.id })}>{L('Delete')}</Menu.Item>
                </Menu>
              }
              placement="bottomLeft"
            >
              <Button type="primary" icon={<SettingOutlined />}>
                {L('Actions')}
              </Button>
            </Dropdown>
          </div>
        ),
      },
    ];

    return (
      <Card>
        <Row>
          <Col
            xs={{ span: 4, offset: 0 }}
            sm={{ span: 4, offset: 0 }}
            md={{ span: 4, offset: 0 }}
            lg={{ span: 2, offset: 0 }}
            xl={{ span: 2, offset: 0 }}
            xxl={{ span: 2, offset: 0 }}
          >
            {' '}
            <h2>{L('Courses')}</h2>
          </Col>
          <Col
            xs={{ span: 14, offset: 0 }}
            sm={{ span: 15, offset: 0 }}
            md={{ span: 15, offset: 0 }}
            lg={{ span: 1, offset: 21 }}
            xl={{ span: 1, offset: 21 }}
            xxl={{ span: 1, offset: 21 }}
          >
            <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => this.createOrUpdateModalOpen({ id: 0 })} />
          </Col>
        </Row>
        <Row>
          <Col sm={{ span: 10, offset: 0 }}>
            <Search placeholder={this.L('Filter')} onSearch={this.handleSearch} />
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 24, offset: 0 }}
            xxl={{ span: 24, offset: 0 }}
          >
            <Table
              rowKey={(record) => record.id.toString()}
              bordered={true}
              columns={columns}
              pagination={{ pageSize: 10, total: courses === undefined ? 0 : courses.totalCount, defaultCurrent: 1 }}
              loading={courses === undefined ? true : false}
              dataSource={courses === undefined ? [] : courses.items}
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>
        <CreateOrUpdateCourse
          formRef={this.formRef}
          visible={this.state.modalVisible}
          onCancel={() => {
            this.setState({
              modalVisible: false,
            });
            this.formRef.current?.resetFields();
          }}
          modalType={this.state.userId === 0 ? 'edit' : 'create'}
          onCreate={this.handleCreate}
          departmentStore={this.props.departmentStore}
          
          // roles={this.props.userStore.roles}
        />
      </Card>
      
    );
  }
}

export default Course;
