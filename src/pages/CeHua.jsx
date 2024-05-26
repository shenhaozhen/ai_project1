import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, Input,  Table, Select } from 'antd';
import {fetchFromOpenAI2} from "../api/openai_api"
const { TextArea } = Input;

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

let data = 
[
    {
      category: '策划类型',
      content: '产品策划（√） 会议策划（√）',
    },
    {
      category: '产品名称',
      content: '胰激肽原酶肠溶片120单位市场营销目标',
    },
    {
      category: '市场营销目标',
      content: '提升胰激肽原酶肠溶片在云南省的知名度，提高患者的使用量',
    },
    {
      category: '产品策划',
      content: `策划目的：提升胰激肽原酶肠溶片在云南省的知名度，提高患者的使用量。竞品对比情况：如下表
      市场占有查情况：日前依帕司他片在云南省各城市和地区医院均有销售，覆盖面广，用量大。
      策略：在推广药品之前，对云南省内的市场需求进行深入了解，对目标患者的数量、年龄段、地域分布、治疗需求等进行调研，可以通过市场调研、医疗机构的数据分析、专家访谈等方式获取，通过对市场的了解，确定产品的目标市场和潜在消费者，为后续的推广活动提供方向。
      在了解市场需求的基础上，找到重点营销客户，投入更多资源和精力做攻坚和维护，有些药品使用基本固定，用量饱和的医院，需要将我们产品优势突出，依帕司他片的销量占了很大比重，要想提升患者使用量，就要让患者了解到怡开片更好的地方，吸引患者主动使用，并且让客户也愿意为患者使用。
      药品质量是推广的核心，我们应该不断提高药品的生产质量，确保产品的安全性和有效性，同时积极开展药品质量评估和检测，及时发现并解决潜在问题，还需要加强与监管机构的沟通与合作，确保药品符合当地相关法规和标准。
      建立覆盖全省的销售网络，选择合适的销售渠道并与渠道合作伙伴建立长期稳定的合作关系，加强销售网络的维护和管理，确保药品在各个销售渠道的供应和销售得到有效保障
      通过品牌塑造和传播，提升药品的知名度和美誉度。如开展品牌宣传活动，专家讲座等：加强与行业内权威机构和专家的合作，提升品牌的专业度和信任度。
      市场策路`,
    },
     {
      category: '会议策划',
      content: `策划目的：提升胰激肽原酶肠溶片在云南省的知名度，提高患者的使用量，让更多客户了解到怡开片在糖尿病并发症方面的突出优势，
      云南省医学会督脏病学分会2023年第四次日常学术活动：
      会议方式：参会
      会议时间：2023年11月底
      会议地点：昆明市华帝王朝酒店
      会议规模：120人
      参会对象：云南省各医院肾内科，内分泌科医生
      会议安排：邀请日标客户参加专题会议，安排参会专家行程，多与专家沟通互动，相互了解。本次学术活动中邀请云南省医学会肾脏病学分会主任委员、昆明医科大学第一附属医院周竹教授等专家以《肾脏移植实践与研究进展》，《高血压肾病的诊治进展与争议》、《血液净化技术的发展》、《中医中药在CXD一体化治疗中的应用》等为题进行多场讲座，讲座内容聚肾脏病专业前沿新技术，覆盖向治疗、人工智能、中医结合临床等热点领域：既贴近临床，又聚焦前沿。会议期间，参会的专家教授对IgA肾脏病，糖尿病肾病，及肾脏疾病高血压管理的临床研究进展等方面进行全方位、多层次的深入交流，进行了病例分享，点评，总结，对工作中的疑点进行深入的讨论和辩论。在糖尿病肾病的病例分享中体现了激肽原酶参与了治疗。在参会期间。利用社交媒体平台（如微信、微博等）发布会议信息和动态，通过文字、图片和视频等方式，实时传递药品信息和会议现场情况。此外，可以通过社交媒体平台与参会者互动，增强与目标受众的联系。
      会后重点跟进的医院名称及科室：云南省第一人民医院肾内科，昆医附二院肾内科，联勤保障部队920医院肾内科。`,
    },
]

const addKeys = (data) => {
    return data.map((item, index) => {
      return {key: index, ...item}
    })
}


const CeHua = () => {

    const [dataSource, setDataSource] = useState(addKeys(data));
    const [chosenIndex, setChosenIndex] = useState(-1);
    const TARef = useRef(null);

      const defaultColumns = [
        {
          title: '分类',
          dataIndex: 'category',
        },
        {
          title: '内容',
          dataIndex: 'content',
          editable: true,
        },
      ];

      const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setDataSource(newData);
      };

      const components = {
        body: {
          row: EditableRow,
          cell: EditableCell,
        },
      };

      const columns = defaultColumns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: (record) => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave,
          }),
        };
      });  


      const handleSelectChange = (e) => {
          setChosenIndex(e);
      }

      const handleSubmit = async () => {
        let userInput = TARef.current.resizableTextArea.textArea.value
        let sysMessage = "";
        sysMessage += "根据###之间内容，参考它的格式和内容涵盖的方面，根据用户的需求生成类似的内容"
        sysMessage += "###" + dataSource[chosenIndex].category + ":" + dataSource[chosenIndex].content + "###"
        let userMessage = "";
        userMessage += `生成${dataSource[chosenIndex].category}，要求为：${userInput}` 
        let res = await fetchFromOpenAI2(sysMessage, userMessage)
        res = res.choices[0].message.content
        let newData = [...dataSource]
        newData[chosenIndex].content = res
        setDataSource(newData)
      }

      let options = dataSource.map((item,index) => {
        return {value: index, label: item.category}
      })
      options = options.filter((item,index) => index == 3 || index == 4)



  return (
    <div className="w-full h-max bg-gray-300 flex flex-col justify-center items-center py-[10px]">
      <h1 className="text-3xl font-bold mb-[10px]"> 策划方案表</h1>
      <Table 
        className="w-[80%]"
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
        showHeader={false}
        pagination={false}
      />
      <div className="w-[80%] flex flex-row flex-wrap">
        <Select
            defaultValue="选择策划类型"
            style={{
                width: 120,
            }}
            onChange={handleSelectChange}
            options={options}
        />  
        <TextArea
            ref= {TARef}
            placeholder="请为想用ai生成的部分提供更多信息"
            style={{
                width : '60%',
                height: 200,
                resize: 'none',
            }}
        />
        <button className="self-end bg-violet-500 w-[60px] h-[40px] text-white rounded-[5px]" onClick={handleSubmit}> 提交</button>
      </div>
    </div>
  )
}

export default CeHua