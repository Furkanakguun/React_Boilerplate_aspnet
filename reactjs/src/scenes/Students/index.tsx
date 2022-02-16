/* eslint-disable */

import * as React from 'react';

import { Card, Col, Input, Row, Table, Modal, Button, Dropdown, Menu, Divider, Select, List, Typography, TreeSelect, DatePicker, Switch, Transfer } from 'antd';
import { inject, observer } from 'mobx-react';

import AppComponentBase from '../../components/AppComponentBase';
import CreateOrUpdateStudent from './components/createOrUpdateStudent';
import AddCourseToStudent from './components/addCourseToStudent';
import { EntityDto } from '../../services/dto/entityDto';
import { L } from '../../lib/abpUtility';
import Stores from '../../stores/storeIdentifier';
import StudentStore from '../../stores/studentStore';
import Form, { FormInstance } from 'antd/lib/form';
import { DownCircleFilled, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import CourseStore from '../../stores/courseStore';
import { Label } from 'recharts';
import DepartmentStore from '../../stores/departmentStore';
import ReactPlaceholder from 'react-placeholder/lib';
import HelloContent from './components/studentcontent';
import { RectShape, TextBlock } from 'react-placeholder/lib/placeholders';

export interface IStudentProps {
  studentStore: StudentStore;
  courseStore: CourseStore;
  departmentStore: DepartmentStore;
}

export interface IStudentState {
  modalCreateVisible: boolean;
  beReady: boolean;
  modalAddCourseVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  userId: number;
  filter: string;
  targetKeys: string[];
  selectedKeys: string[],
  disabled: boolean,
  sortDirection: string;
  sortExpression: string;
}
const mockData: { key: string; title: string; description: string; disabled: boolean; }[] = [];

const awesomePlaceholder = (
  <div className='my-awesome-placeholder'>
    <RectShape color='black' style={{ width: 0, height: 0 }} />
    <TextBlock rows={2} color='grey'  />
    LOADING....
    <TextBlock rows={2} color='grey'  />
    LOADING....
    <TextBlock rows={2} color='grey'  />
  </div>
);

const oriTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);

const confirm = Modal.confirm;
const Search = Input.Search;

@inject(Stores.StudentStore)
@inject(Stores.DepartmentStore)
@inject(Stores.CourseStore)
@observer
class Student extends AppComponentBase<IStudentProps, IStudentState> {
  formRef = React.createRef<FormInstance>();

  state = {
    modalCreateVisible: false,
    beReady: false,
    modalAddCourseVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    userId: 0,
    filter: '',
    targetKeys: oriTargetKeys,
    selectedKeys: [],
    disabled: false,
    sortDirection: 'ascend',
    sortExpression: 'Brand'
  };



  async componentDidMount() {
    await this.getAll();
    await this.getAllCourses('');
    await this.getAllDepartments();
    this.createCourseTransferData();
  }

  async getAll() {
    this.setState({
      beReady: false,
    });
    await this.props.studentStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter }).then((value) => {
      this.setState({
        beReady: true,
      });
    })

  }

  handleTableChange = (pagination: any) => {
    this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll());
  };

  ModalCreateUpdate = () => {
    this.setState({
      modalCreateVisible: !this.state.modalCreateVisible,
    });
  };

  ModalAddCourse = () => {
    this.setState({

      modalAddCourseVisible: !this.state.modalAddCourseVisible,
    });
  };

  async addCourseModalOpen(entityDto: EntityDto) {

    await this.props.studentStore.get(entityDto);
    await this.props.studentStore.getCourses();
    this.setState({ userId: entityDto.id });
    this.ModalAddCourse();

    setTimeout(() => {
      this.formRef.current?.setFieldsValue({ ...this.props.studentStore.editStudent });
    }, 100);
  }

  handleAddCourseToStudent = () => {
    const form = this.formRef.current;

    form!.validateFields().then(async (values: any) => {
      if (this.state.userId === 0) {
        await this.props.studentStore.create(values);
      } else {
        await this.props.studentStore.update({ ...values, id: this.state.userId });
      }

      await this.getAll();
      this.setState({ modalCreateVisible: false });
      form!.resetFields();
    });
  };


  async createOrUpdateModalOpen(entityDto: EntityDto) {
    if (entityDto.id === 0) {
      await this.props.studentStore.createUser();
      //await this.props.studentStore.getRoles();
    } else {
      await this.props.studentStore.get(entityDto);
      //await this.props.studentStore.getRoles();
    }

    this.setState({ userId: entityDto.id });
    this.ModalCreateUpdate();

    setTimeout(() => {
      this.formRef.current?.setFieldsValue({ ...this.props.studentStore.editStudent });
    }, 100);
  }

  delete(input: EntityDto) {
    const self = this;
    confirm({
      title: 'Do you Want to delete these items?',
      onOk() {
        self.props.studentStore.delete(input);
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
        await this.props.studentStore.create(values);
      } else {
        await this.props.studentStore.update({ ...values, id: this.state.userId });
      }

      await this.getAll();
      this.setState({ modalCreateVisible: false });
      form!.resetFields();
    });
  };

  handleSearch = (value: string) => {
    this.setState({ filter: value }, async () => await this.getAll());
    console.log(`selected ${value}`);
  }


  onChange = (value: string) => {
    console.log(`selected ${value}`);
    this.setState({}, async () => await this.getAllCourses(value));
  }

  onSearch(val: string) {
    console.log('search:', val);
  }

  async getAllDepartments() {
    await this.props.departmentStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
  }


  async getAllCourses(value: string) {
    await this.props.courseStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter, sorting: this.state.sortExpression, direction: this.state.sortDirection });
    console.log(`selected ${value}`);
  }

  addCourseToList = () => {

  }

  getReady = () => {
    this.setState({
      beReady: !this.state.beReady,
    });
    console.log(this.state.beReady);
  }
  //------------Transfer Methods----------------\\
  handleChange = (nextTargetKeys: any, direction: any, moveKeys: any) => {
    this.setState({ targetKeys: nextTargetKeys });
    console.log('targetKeys: ', nextTargetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  };

  handleSelectChange = (sourceSelectedKeys: any, targetSelectedKeys: any) => {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });

    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  };

  handleScroll = (direction: any, e: { target: any; }) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  };

  handleDisable = (disabled: any) => {
    this.setState({ disabled });
  };

  createCourseTransferData() {
    const courses = this.props.courseStore;
    this.setState({}, async () => {
      for (let i = 0; i < courses.courses.items.length; i++) {
        mockData.push({
          key: i.toString(),
          title: courses.courses.items[i].name,
          description: `description of content${i + 1}`,
          disabled: false,
        });
        console.log('coursess:' + courses.courses.items[i].name);
      }
    });
    this.setState({ disabled: false });
  }
  //------------Transfer Methods----------------\\



  public render() {
    // this.getAllDepartments();
    // this.getAllCourses();
    const { departments } = this.props.departmentStore;
    const { students } = this.props.studentStore;
    const { courses } = this.props.courseStore;
    const { TreeNode } = TreeSelect;
    const { Option, OptGroup } = Select;
    const { RangePicker } = DatePicker;
    const { targetKeys, selectedKeys, disabled } = this.state;
    const columns = [
      { title: L('Name'), dataIndex: 'name', key: 'name', sorter: (a: any, b: any) => a.name.localeCompare(b.name), width: 150, render: (text: string) => <div>{text}</div> },
      { title: L('Surname'), dataIndex: 'surname', key: 'surname', sorter: (a: any, b: any) => a.surname.localeCompare(b.surname), width: 150, render: (text: string) => <div>{text}</div> },
      { title: L('Department'), dataIndex: 'department', key: 'department', sorter: (a: any, b: any) => a.department.localeCompare(b.department), width: 150, render: (text: string) => <div>{text}</div> },
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
                  <Menu.Item onClick={() => this.addCourseModalOpen({ id: item.id })}>{L('Add Course')}</Menu.Item>
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
      <><Card>
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
            <h2>{L('Students')}</h2>
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
            <Button
              onClick={this.getReady}
              type="primary"
              icon={< PlusOutlined />}>
              {L('Be Ready')}
            </Button>
            <Divider>

            </Divider>
            <ReactPlaceholder ready={this.state.beReady} customPlaceholder={awesomePlaceholder}>
              <Table
                rowKey={(record) => record.id.toString()}
                bordered={true}
                columns={columns}
                pagination={{ pageSize: 10, total: students === undefined ? 0 : students.totalCount, defaultCurrent: 1 }}
                loading={students === undefined ? true : false}
                dataSource={students === undefined ? [] : students.items}
                onChange={this.handleTableChange} />
            </ReactPlaceholder>
          </Col>
        </Row>
        <CreateOrUpdateStudent
          formRef={this.formRef}
          visible={this.state.modalCreateVisible}
          onCancel={() => {
            this.setState({
              modalCreateVisible: false,
            });
            this.formRef.current?.resetFields();
          }}
          modalType={this.state.userId === 0 ? 'edit' : 'create'}
          onCreate={this.handleCreate} />
        <AddCourseToStudent
          formRef={this.formRef}
          visible={this.state.modalAddCourseVisible}
          onCancel={() => {
            this.setState({
              modalAddCourseVisible: false,
            });
            this.formRef.current?.resetFields();
          }}
          onCreate={this.handleAddCourseToStudent}
          courses={this.props.studentStore.courses}
          departmentStore={this.props.departmentStore} />
      </Card>
        <Card>
          <Label >{L('Name')}</Label>
          {/* Select DropDown with Groups */}
          <Divider orientation="left"> Select DropDown with Groups</Divider>
          <Form.Item label={L('Departments')} name={'departments2'}>
            <Select defaultValue="Departments" style={{ width: 200 }} >
              <OptGroup label="Engineering">
                <Option value="CMPE">CMPE</Option>
                <Option value="Civil">Civil</Option>
              </OptGroup>
              <OptGroup label="Bussiness">
                <Option value="Bussiness Administration">Bussiness Administration</Option>
              </OptGroup>
            </Select>
          </Form.Item>
          {/* Select DropDown */}
          <Divider orientation="left">Select DropDown</Divider>
          <Form.Item label={L('Students')} name={'students'}>
            <Select
              showSearch
              placeholder="Select a student"
              optionFilterProp="children"
              onChange={this.onChange}
              onSearch={this.onSearch}
            >
              {students === undefined ? [] : students.items.map((item: any) => (
                <Menu.Item key={item.name}>
                  {item.name}
                </Menu.Item>
              ))}
            </Select>
          </Form.Item>
          {/* Standart Dropdown with Button (USed for navigation usually) */}
          <Divider orientation="left">Standart Dropdown with Button (Used for navigation usually)</Divider>
          <Form.Item label={L('Courses')} name={'courses'}>
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu>
                  {students === undefined ? [] : students.items.map((item: any) => (
                    <Menu.Item key={item.name} >
                      {item.name}
                    </Menu.Item>
                  ))}
                </Menu>
              }
              placement="bottomLeft"
            >
              <Button icon={<DownCircleFilled />}>
                {L('Select Course')}
              </Button>
            </Dropdown>
          </Form.Item>
          {/* Gridy Layout with margins and paddings */}
          <Divider orientation="left">Gridy Layout with margins and paddings</Divider>
          <Form.Item label={L('Course Selection:')} name={'name'} >
            <Row gutter={8}>
              <Col span={8} >
                <Select
                  showSearch
                  placeholder="Select a department"
                  optionFilterProp="children"
                  //onChange={this.onChange}
                  onSearch={this.onSearch}
                  onSelect={this.onChange}
                >
                  {departments === undefined ? [] : departments.items.map((item: any) => (
                    <Menu.Item key={item.name}  >
                      {item.name}
                    </Menu.Item>
                  ))}
                </Select>
              </Col>
              <br />
              <Col span={8}>
                <Select
                  showSearch
                  placeholder="Select a course"
                  optionFilterProp="children"
                >
                  {courses === undefined ? [] : courses.items.map((item: any) => (
                    <Menu.Item key={item.name}>
                      {item.name}
                    </Menu.Item>
                  ))}
                </Select>
              </Col>
              <Col span={8}>
                <Button
                  onClick={this.addCourseToList}
                  type="primary"
                  icon={< PlusOutlined />}>
                  {L('Add')}
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <Divider orientation="left">Tree Select</Divider>
          <Row gutter={8}>
            <Col span={8} >
              <Form.Item label={L('Tree:')} name={'name'} >
                <TreeSelect treeLine={true} style={{ width: 300 }}>
                  <TreeNode value="parent 1" title="parent 1">
                    <TreeNode value="parent 1-0" title="parent 1-0">
                      <TreeNode value="leaf1" title="my leaf" />
                      <TreeNode value="leaf2" title="your leaf" />
                    </TreeNode>
                    <TreeNode value="parent 1-1" title="parent 1-1">
                      <TreeNode value="sss" title="sss" />
                    </TreeNode>
                  </TreeNode>
                </TreeSelect>
              </Form.Item>
            </Col>
            <Col span={8} >
              <Form.Item label={L('Tree Select List:')} name={'name'} >
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="select student"
                  optionLabelProp="label"
                >
                  {students === undefined ? [] : students.items.map((item: any) => (
                    <Option value={item.name} label={item.name}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8} >
            </Col>
          </Row>
          <Divider orientation="left">DatePicker(Range Picker)</Divider>
          <Row gutter={8}>
            <Col span={6} >
              <RangePicker />
            </Col>
            <Col span={6} >
              <RangePicker picker="week" />
            </Col>
            <Col span={6} >
              <RangePicker picker="month" />
            </Col>
            <Col span={6} >
              <RangePicker picker="year" />
            </Col>
          </Row>

          <Divider orientation="left">Transfer controller</Divider>
          <Row gutter={8}>
            <Col span={8} >

            </Col>
            <Col span={8} >
              <Transfer
                dataSource={mockData}
                titles={['Source', 'Target']}
                targetKeys={targetKeys}
                selectedKeys={selectedKeys}
                onChange={this.handleChange}
                onSelectChange={this.handleSelectChange}
                onScroll={this.handleScroll}
                render={item => item.title!}
                disabled={disabled}
                oneWay
                style={{ marginBottom: 16, }}
              />
              <Switch
                unCheckedChildren="disabled"
                checkedChildren="disabled"
                checked={disabled}
                onChange={this.handleDisable}
              />
            </Col>
            <Col span={8} >
            </Col>
          </Row>

          <Divider orientation="left">Default Size List</Divider>
          <List
            bordered
            dataSource={students === undefined ? [] : students.items}
            renderItem={item => (
              <List.Item>
                <Typography.Text key={item.name}>
                  {item.name}
                </Typography.Text>
              </List.Item>
            )}
          />
          <ReactPlaceholder ready={false} customPlaceholder={awesomePlaceholder}>
            <HelloContent />
          </ReactPlaceholder>
        </Card>
      </>
    );
  }
}

export default Student;
