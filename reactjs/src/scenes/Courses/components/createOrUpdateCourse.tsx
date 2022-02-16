import * as React from 'react';

import { Input, Modal, Tabs, Form, Select, Menu } from 'antd';
// import { GetRoles } from '../../../services/user/dto/getRolesOuput';
import { L } from '../../../lib/abpUtility';
import rules from './createOrUpdateCourse.validation';
import { FormInstance } from 'antd/lib/form';
import DepartmentStore from '../../../stores/departmentStore';
import Stores from '../../../stores/storeIdentifier';
import { inject } from 'mobx-react';
import { Option } from 'antd/lib/mentions';

const TabPane = Tabs.TabPane;

export interface ICreateOrUpdateCourseProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  //roles: GetRoles[];
  formRef: React.RefObject<FormInstance>;
  departmentStore: DepartmentStore;
}

@inject(Stores.DepartmentStore)
class CreateOrUpdateCourse extends React.Component<ICreateOrUpdateCourseProps> {
  state = {
    confirmDirty: false,
    departmentId: 0
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



  onChange = (value: string) => {
    console.log(`selected ${value}`);
    this.setState({ departmentId: value });
  }

  render() {
    const { visible, onCancel, onCreate } = this.props;
    const { departments } = this.props.departmentStore;

    const formItemLayout = {
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

    return (
      <Modal visible={visible} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'Course'} destroyOnClose={true}>
        <Form ref={this.props.formRef}>
          <Tabs defaultActiveKey={'courseInfo'} size={'small'} tabBarGutter={64}>
            <TabPane tab={'Course'} key={'courseInfo'}>
              <Form.Item label={L('Course name')} {...formItemLayout} name={'name'} rules={rules.name}>
                <Input />
              </Form.Item>
              <Form.Item label={L('Department')} {...formItemLayout} name={'departmentId'} rules={rules.department}>
                <Select
                  //options={departments.items === undefined ? [] : departments.items}
                  showSearch
                  placeholder="Select a department"
                  optionFilterProp="children"
                  //onChange={this.onChange}
                  // onSearch={this.onSearch}
                  onSelect={this.onChange}
                >
                  {departments === undefined ? [] : departments.items.map((item: any) => (
                    <Option value={item.id} key={item.id}  >
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label={L('Capacity')} {...formItemLayout} name={'capacity'} rules={rules.capacity}>
                <Input />
              </Form.Item>
            </TabPane>
            <TabPane tab={L('Departments')} key={'departmen'} forceRender={true}>
              <Select
                showSearch
                placeholder="Department"
                optionFilterProp="children"
              >
                {departments === undefined ? [] : departments.items.filter(x => x.id === 6).map((item: any) => (
                  <Menu.Item key={item.name}>
                    {item.name}
                  </Menu.Item>
                ))}
              </Select>
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateCourse;
