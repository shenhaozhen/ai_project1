import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, Input, Table, Select } from 'antd';
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
      number: '7',
      category: '其他咨询内容',
      work: '市场准入咨询',
      content: '指标已完成，资标，挂网已有省准入价格',
    },
    {
        number: '7',
        category: '其他咨询内容',
        work: '医疗机构准入咨询',
        content: `1尚志市人民医院临床主任根据临床用药的需求，向药剂科提出用药申请,医院有一品双规限制
        2医院药剂科对临床科室的用药申请进行复核批准
        3院长主管进药医院，对申请进行审核：医院药事委员会对欲购药品进行讨论通过，4个月一次药事会
        4通过药剂师委员会的讨论之后，药剂科主任会下达药品通知，采购会根据药剂科主任的指示与相关的医药公司联系采购药品：
        5.商业公司：3天内配送药品进入医院；
        6、延寿县人民医院无一品双规限制，采取最低价采购，需要药剂科提单才能进入采购流程。`,
    },
    {
        number: '7',
        category: '其他咨询内容',
        work: '商业渠道配送覆盖咨询',
        content: `可以通过国药控股黑龙江公司，上药科园信黑龙江医院有限公司配送
        1.商业资质齐全，能覆盖该地区80%的医院
        2.需要根据医院的需求和配速计划，安排配速车辆和人员，确保药品的及时送达
        3.在配送过程中，需要加强对药品的防护和管理。避免药品损坏或污染，4需要按照规定的时限要求，确保药品按时送达医院。`,
    },
    {
        number: '7',
        category: '其他咨询内容',
        work: '患者用药习惯',
        content: `1.治疗效果好，并且是口服剂型，服用方便
        2.日均治疗费用低，减经经济负担
        3.不良反应小，副作用小，`,
    },
    {
        number: '7',
        category: '其他咨询内容',
        work: '产品疗效',
        content: `1.消化内科：本品含有多种消化酶，主要用于治疗各种消化不良相关的症状；2.老年科：根据老年人笑话特点。
                  本品包含治疗早饱，食欲缺乏，包括腹部不适，嗳气，早饱，餐后腹胀，恶心，排气过多，脂肪便；3.儿科：本品安全性较高
                  ，儿童可以根据月龄，进行剂量调整，治疗消化不良；4.外科：可用于胆囊炎，胆结石，以及胆囊切除患者的消化不良。`,
    },
    {
        number: '7',
        category: '其他咨询内容',
        work: '产品副作用',
        content: `1.本品也存在一定的副作用，可能出现呕吐，恶心，软便，心悸，憋气等不良反应：一般无需特别处理；2.偶尔见如过敏，体重增加;
                  3.注意事项:复方消化酶胶囊的安全性较高，适用范围较广，老人儿童孕妇都可以在医生的指导下谨慎服用。`,
    },
    {
        number: '7',
        category: '其他咨询内容',
        work: '医生对产品的熟悉度及疑问',
        content: `1.消化内科对消化不良的重视度高中国人群的饮食结构特色性，导致对酶类制剂有一定的治疗需求，不良反应小，患者容易接受;
                  2.外科手术后进食患者，需要特别关注消化问题，拟定开展科会，为医生讲解复方消化酶的作用机制；
                  3.儿童患者的应用，目前还有很大的需求，加强拜访按照月龄的使用剂量，合理用药`,
    },
    {
        number: '7',
        category: '其他咨询内容',
        work: '医生反馈',
        content: '药物剂量也会影响药物效果，如果药剂量偏小效果就会大打折扣，但剂量过大效果不会因此增加，反而会出现一些不良反应因此患者合理用药才是保证药物效果的基础。',
    },

]

const addKeys = (data) => {
    return data.map((item, index) => {
      return {key: index, ...item}
    })
}



const ZiXun = () => {
      
      const [dataSource, setDataSource] = useState(addKeys(data));
      
      const [chosenIndex, setChosenIndex] = useState(0);

      const TARef = useRef(null)

      const defaultColumns = [
        {
          title: '序号',
          dataIndex: 'number',
          onCell: (_, index) => {
              if (index == 0) {
                  return {
                      rowSpan: 8
                  }
              } else {
                  return {
                      rowSpan: 0
                  }
              }
          }
        },
        {
          title: '分类',
          dataIndex: 'category',
          onCell: (_, index) => {
            if (index == 0) {
                return {
                    rowSpan: 8
                }
            } else {
                return {
                    rowSpan: 0
                }
            }
        }
        },
        {
          title: '工作内容',
          dataIndex: 'work',
          editable: true,
        },
        {
          title: '填报内容',
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
      const handleSelectChange = (value) => {
        setChosenIndex(value);
      };

      const handleTAChange = (e) => {

      };

      const handleSubmit = async(e) => {
        e.preventDefault();
        let userInput = TARef.current.resizableTextArea.textArea.value;
        let sysMessage = '';
        sysMessage += "根据###之间内容，参考它的格式和涵盖的方面，根据用户的需求生成类似的内容"
        sysMessage += "###" + dataSource[chosenIndex].work + ":" + dataSource[chosenIndex].content + "###"
        let userMessage = "";
        userMessage += `生成${dataSource[chosenIndex].work}，要求为：${userInput}` 
        let res = await fetchFromOpenAI2(sysMessage, userMessage)
        res = res.choices[0].message.content
        let newData = [...dataSource]
        newData[chosenIndex].content = res
        setDataSource(newData)
      }

      let options = dataSource.map((item,index) => {
          return {value: index, label: item.work}
      })

      return (
        <div className="w-full flex flex-col justify-center items-center bg-gray-300 py-[10px]" >
          <h1 className="text-3xl font-bold mb-[10px]"> 市场咨询服务确认表</h1>
          <Table
            className="w-[80%] mb-[10px]"
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns}
            pagination={false}
          />
          <div className="w-[80%] flex flex-row flex-wrap">
            <Select
            defaultValue={dataSource[0].work}
            style={{
                width: 120,
            }}
            onChange={handleSelectChange}
            options={options}
            />  
            <TextArea
            onChange={handleTAChange}
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
      );
}

export default ZiXun