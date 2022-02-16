import * as React from 'react';

import { Input, Modal, Tabs, Form, Menu, Button, Checkbox, Select, Row, Col, Divider, List, Typography, message, Popconfirm } from 'antd';
import { GetCourses } from '../../../services/student/dto/getCoursesOutput';
import { L } from '../../../lib/abpUtility';
// import rules from './createOrUpdateStudent.validation';
import { FormInstance } from 'antd/lib/form';
import { Label } from 'recharts';
import { PlusOutlined } from '@ant-design/icons';
import DepartmentStore from '../../../stores/departmentStore';


const TabPane = Tabs.TabPane;


export interface IAddCourseToStudentProps {
  visible: boolean;
  onCancel: () => void;
  onCreate: () => void;
  formRef: React.RefObject<FormInstance>;
  courses: GetCourses[];
  departmentStore: DepartmentStore;
}

class AddCourseToStudent extends React.Component<IAddCourseToStudentProps> {

  state = {
    confirmDirty: false,
    coursesDdl: this.props.children
  };

  compareToFirstPassword = (rule: any, value: any, callback: any) => {
    const form = this.props.formRef.current;

    if (value && value !== form!.getFieldValue('password')) {
      return Promise.reject('Two passwords that you enter is inconsistent!');
    }
    return Promise.resolve();
  };


  validateToNextPassword = (rule: any, value: any, callback: any) => {
    const { validateFields, getFieldValue } = this.props.formRef.current!;

    this.setState({
      confirmDirty: true,
    });

    if (value && this.state.confirmDirty && getFieldValue('confirm')) {
      validateFields(['confirm']);
    }

    return Promise.resolve();
  };


  onChange(value: string) {
    console.log(`selected ${value}`);
  }

  onSearch(val: string) {
    console.log('search:', val);
  }
  onMore = () => {
    //console.log('search:', val);
  }

  confirmDelete() {
    message.info('Clicked on Yes.');
  }


  render() {
    //const { roles } = this.props;
    const { courses } = this.props;
    const { departments } = this.props.departmentStore;


    const formItemLayout = {
      labelCol: {
        xs: { span: 5 },
        sm: { span: 5 },
        md: { span: 5 },
        lg: { span: 5 },
        xl: { span: 5 },
        xxl: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 21 },
        sm: { span: 21 },
        md: { span: 21 },
        lg: { span: 12 },
        xl: { span: 21 },
        xxl: { span: 21 },
      },
    };
    const tailFormItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 6 },
        md: { span: 6 },
        lg: { span: 6 },
        xl: { span: 6 },
        xxl: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 18 },
        md: { span: 18 },
        lg: { span: 18 },
        xl: { span: 18 },
        xxl: { span: 18 },
      },
    };

    const { visible, onCancel, onCreate } = this.props;

    const options = courses.map((x: GetCourses) => {
      var test = { label: x.name, value: x.name };
      return test;
    });

    return (
      <Modal visible={visible} cancelText={L('Cancel')} okText={L('OK')} width={620} onCancel={onCancel} onOk={onCreate} title={'Student'} destroyOnClose={true}>
        <Form ref={this.props.formRef}>
          <Tabs defaultActiveKey={'studentInfo'} size={'small'} tabBarGutter={64}>
            <TabPane tab={'Course Selection'} key={'studentInfo'}>
              <Label >{L('Name')}</Label>
              <Form.Item label={L('Name')} {...formItemLayout} name={'name'} >
                <Input disabled={true} />
              </Form.Item>
              <Form.Item label={L('Surname')} {...formItemLayout} name={'surname'}>
                <Input disabled={true} />
              </Form.Item>
              <Form.Item label={L('Department')} {...formItemLayout} name={'department'}>
                <Input disabled={true} />
              </Form.Item>

              {/* Gridy Layout with margins and paddings */}
              <Divider orientation="left">Gridy Layout with margins and paddings</Divider>
              <Form.Item label={L('Course Selection:')} {...formItemLayout} name={'name'} >
                <Row gutter={8}>
                  <Col span={8} >
                    <Select
                      showSearch
                      placeholder="Select a department"
                      optionFilterProp="children"
                      onChange={this.onChange}
                      onSearch={this.onSearch}
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
                      onChange={this.onChange}
                      onSearch={this.onSearch}
                    >
                      {courses.map((item: any) => (
                        <Menu.Item key={item.name} >
                          {item.name}
                        </Menu.Item>
                      ))}
                    </Select>
                  </Col>
                  <Col span={8}>
                    <Button
                      type="primary"
                      icon={< PlusOutlined />}
                    >
                      {L('Add')}
                    </Button>
                  </Col>
                </Row>
              </Form.Item>


            </TabPane>

            <TabPane tab={L('Courses')} key={'course'} forceRender={true}>
              <Form.Item {...tailFormItemLayout} name={'courseName'}>
                <Checkbox.Group options={options} />
              </Form.Item>
              <Divider orientation="left">Courses</Divider>
              <List
                // header={<div>---Header---</div>}
                // footer={<div>---Footer---</div>}
                className="demo-loadmore-list"
                bordered
                dataSource={courses}
                renderItem={item => (

                  <List.Item actions={[
                    <Popconfirm placement="top" title={'Are you sure to delete this task?'} onConfirm={this.confirmDelete} okText="Yes" cancelText="No">
                      <a>Delete</a>
                    </Popconfirm>
                  ]
                  }>
                    <Typography.Text key={item.name}>
                      {item.name}
                    </Typography.Text>
                    Edit
                  </List.Item>

                )}
              />

            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    );
  }
}

export default AddCourseToStudent;
