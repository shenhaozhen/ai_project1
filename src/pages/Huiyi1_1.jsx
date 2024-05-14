import React, { useContext, useEffect, useRef, useState } from 'react';
import {Table, Form, Input, message} from 'antd';
import {fetchFromOpenAI2} from "../api/openai_api"

const rawColumns = [
  {
    title: 'Category',
    dataIndex: 'category',
    onCell: ( _ , index) => {
      if(index === 8) {
       return {
         rowSpan: 4,
       }
      }
      if(index > 8 && index < 12) {
        return {
          rowSpan: 0,
        }
      }
      if(index === 12) {
        return {
          rowSpan: 18,
        }
      }
      if(index > 12) {
        return {
          rowSpan: 0,
        }
      }
    }
  },
  {
    title: 'Content1',
    dataIndex: 'content1',
    editable: true,
  }
];

/*const ori_data = [
  {
    key: '1',
    category: "区域",
    content1: '四川大区',
  },
  {
    key: '2',
    category: "申请人",
    content1: '马佳',
  },
  {
    key: '3',
    category: "申请日期",
    content1: '2023.11.23',
  },
  {
    key: '4',
    category: "会议（培训）议题",
    content1: '2023年四川医学会心血管内科分会学术年会参会类型',

  },
  {
    key: '5',
    category: "参会类型",
    content1: ' 主办（✓） 参会（）',

  },
  {
    key: '6',
    category: "参会人数",
    content1: '78人',

  },
  {
    key: '7',
    category: "会议地点",
    content1: '成都祥宇宾馆',
  },
  {
    key: '8',
    category: "会议时间",
    content1: '2023.12.22-2023.12.23',
  },
  {
    key: '9',
    category: "会议预算",
    content1: '场租（元） 19000 ',
  },
  {
    key: '10',
    category: "会议预算",
    content1: '餐费（元）16000',
  },
  {
    key: '11',
    category: "会议预算",
    content1: '会议预算(元) 12000',
  },
  {
    key: '12',
    category: "会议预算",
    content1: '合计(元） 47000 ',
  },
  {
    key: '13',
    category: "会议议程",
    content1: "12月22日08：00—09：30 一楼签到 ",
  },
  {
    key: '14',
    category: "会议议程",
    content1: "12月22日09：30—09：50 开幕式",
  },
  {
    key: '15',
    category: "会议议程",
    content1: "12月22日09：50—10：10 多方案，强联合，助力我国ASCVD的综合管理",
  },
  {
    key: '16',
    category: "会议议程",
    content1: "12月22日10：10—10：40 OPTION研究开启安全抗栓新时代",
  },
  {
    key: '17',
    category: "会议议程",
    content1: "12月22日10：40—11：20 OCT优化PCI规范路径",
  },
  {
    key: '18',
    category: "会议议程",
    content1: "12月22日11：20—12：00 导管消融并发症的识别与防治",
  },
  {
    key: '19',
    category: "会议议程",
    content1: "12月22日12：00—13：30 午餐",
  },
  {
    key: '20',
    category: "会议议程",
    content1: "12月22日13：40—14：30 导引延长导管应用场景介绍",
  },
  {
    key: '21',
    category: "会议议程",
    content1: "12月22日14：30—15：10 2023年中国血脂指南解读会议议程",
  },
  {
    key: '22',
    category: "会议议程",
    content1: "12月22日15：10—15：20 茶歇",
  },
  {
    key: '23',
    category: "会议议程",
    content1: "12月22日15：20—16：10 新版高血压防治指南解读",
  },
  {
    key: '24',
    category: "会议议程",
    content1: "12月22日16：10—17：00 女性高血压的管理",
  },
  {
    key: '25',
    category: "会议议程",
    content1: "12月22日17：00—17：30 小核酸药物开启治疗新时代",
  },
  {
    key: '26',
    category: "会议议程",
    content1: "12月22日17：30 晚餐",
  },
  {
    key: '27',
    category: "会议议程",
    content1: "12月23日09：00—12：00 2023年心血管病例PK分享会",
  },
  {
    key: '28',
    category: "会议议程",
    content1: "12月23日13：00—15：00 2023年第五届青年医师病例演讲比赛",
  },
  {
    key: '29',
    category: "会议议程",
    content1: "12月23日15：00—15：15 大会总结",
  },
  {
    key: '30',
    category: "会议议程",
    content1: "12月23日15：15—15：35 闭幕式",
  },
];*/

let data = [
  {
    category: "区域",
    content1: '四川大区',
  },
  {
    category: "申请人",
    content1: '马佳',
  },
  {
    category: "申请日期",
    content1: '2023.11.23',
  },
  {
    category: "会议（培训）议题",
    content1: '2023年四川医学会心血管内科分会学术年会参会类型',

  },
  {
    category: "参会类型",
    content1: ' 主办（✓） 参会（）',

  },
  {
    category: "参会人数",
    content1: '78人',

  },
  {
    category: "会议地点",
    content1: '成都祥宇宾馆',
  },
  {
    category: "会议时间",
    content1: '2023.12.22-2023.12.23',
  },
  {
    category: "会议预算",
    content1: '场租（元） 19000 ',
  },
  {
    category: "会议预算",
    content1: '餐费（元）16000',
  },
  {
    category: "会议预算",
    content1: '会议预算(元) 12000',
  },
  {
    category: "会议预算",
    content1: '合计(元） 47000 ',
  },
  {
    category: "会议议程",
    content1: "12月22日08：00—09：30 一楼签到 ",
  },
  {
    category: "会议议程",
    content1: "12月22日09：30—09：50 开幕式",
  },
  {
    category: "会议议程",
    content1: "12月22日09：50—10：10 多方案，强联合，助力我国ASCVD的综合管理",
  },
  {
    category: "会议议程",
    content1: "12月22日10：10—10：40 OPTION研究开启安全抗栓新时代",
  },
  {
    category: "会议议程",
    content1: "12月22日10：40—11：20 OCT优化PCI规范路径",
  },
  {
    category: "会议议程",
    content1: "12月22日11：20—12：00 导管消融并发症的识别与防治",
  },
  {
    category: "会议议程",
    content1: "12月22日12：00—13：30 午餐",
  },
  {
    category: "会议议程",
    content1: "12月22日13：40—14：30 导引延长导管应用场景介绍",
  },
  {
    category: "会议议程",
    content1: "12月22日14：30—15：10 2023年中国血脂指南解读会议议程",
  },
  {
    category: "会议议程",
    content1: "12月22日15：10—15：20 茶歇",
  },
  {
    category: "会议议程",
    content1: "12月22日15：20—16：10 新版高血压防治指南解读",
  },
  {
    category: "会议议程",
    content1: "12月22日16：10—17：00 女性高血压的管理",
  },
  {
    category: "会议议程",
    content1: "12月22日17：00—17：30 小核酸药物开启治疗新时代",
  },
  {
    category: "会议议程",
    content1: "12月22日17：30 晚餐",
  },
  {
    category: "会议议程",
    content1: "12月23日09：00—12：00 2023年心血管病例PK分享会",
  },
  {
    category: "会议议程",
    content1: "12月23日13：00—15：00 2023年第五届青年医师病例演讲比赛",
  },
  {
    category: "会议议程",
    content1: "12月23日15：00—15：15 大会总结",
  },
  {
    category: "会议议程",
    content1: "12月23日15：15—15：35 闭幕式",
  },
];

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

const addKeys = (data) => {
  return data.map((item, index) => {
    return {key: index, ...item}
  })
}

const aiResponse = `###2023年12月22日

08:00—09:30 一楼签到 

09:30—09:50 开幕式

09:50—10:10 高血压管理新进展

10:10—10:40 抗癌药物研究最新进展

10:40—11:20 流感防治策略分享

11:20—12:00 心血管疾病与代谢综合征的关系探讨

12:00—13:30 午餐

13:40—14:30 个性化药物治疗在心血管病中的应用

14:30—15:10 2023年抗癌药物使用指南发布

15:10—15:20 茶歇

15:20—16:10 流感病毒变异及疫苗研究进展

16:10—17:00 高血压并发症防治

17:00—17:30 新型治疗流感药物研究

17:30 晚餐

###2023年12月23日

09:00—12:00 医疗技术在高血压治疗中的应用讨论

13:00—15:00 2023年抗癌新药临床试验结果分享

15:00—15:15 会议总结

15:15—15:35 闭幕式`


const Formpage = () => {

  const [dataSource, setDataSource] = useState(addKeys(data));
  
  const [schedule, setSchedule] = useState("")

  const taRef = useRef(null);

  useEffect(() => {
    console.log(schedule)
  },[schedule])

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const handleSave = (row) => {
    let newData = [...data];
    newData = addKeys(newData)
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
  const columns = rawColumns.map((col) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.dir(e)
    let res = [...dataSource]
    if (e.target[0].value != "" && e.target[0].value != dataSource[0].content1) {
      res[0].content1 = e.target[0].value
    }
    if (e.target[1].value != "" && e.target[1].value != dataSource[1].content1) {
      res[1].content1 = e.target[1].value
    }
    if (e.target[2].value != "" && e.target[2].value != dataSource[2].content1) {
      res[2].content1 = e.target[2].value
    }
    if (e.target[3].value != "" && e.target[3].value != dataSource[3].content1) {
      res[3].content1 = e.target[3].value
    }
    if (e.target[4].value != "" && e.target[4].value != dataSource[4].content1) {
      res[4].content1 = e.target[4].value
    }
    if (e.target[5].value != "" && e.target[5].value != dataSource[5].content1) {
      res[5].content1 = e.target[5].value
    }
    if (e.target[6].value != "" && e.target[6].value != dataSource[6].content1) {
      res[6].content1 = e.target[6].value
    }
    if (e.target[7].value != "" && e.target[7].value != dataSource[7].content1) {
      res[7].content1 = e.target[7].value
    }
    setDataSource(res)
    e.target.reset();

  }

  const generateSchedule = () => {
    let things = dataSource.filter((item) => item.category == "会议议程")
    things = things.map((item) => item.content1)
    return things.join("\n\n")
  }

  const scheduleParser = (scheduleString) => {
    return scheduleString.split("\n\n")
  }

  const sendScheduleRequest= async (userPrompt) => {
    let sample = generateSchedule();
    sample = "###" + sample + "###"
    let date = dataSource.filter((item) => item.category == "会议时间")[0].content1
    let systemMessage = "请根据###之间的例子，参考它的格式和内容类型，按照用户需求生成会议议程。" + sample;
    let userMessage = `会议时间为${date}，包含${userPrompt}和其他一些医学话题，生成会议议程`;
    let res = await fetchFromOpenAI2(systemMessage, userMessage)
    res = scheduleParser(res.choices[0].message.content)
    res = res.map((item) => {
      return {category: "会议议程", content1: item}
    })
    console.log(res)
    data = data.filter((item) => item.category != "会议议程")
    data = data.concat(res)
    setDataSource(addKeys(data)) 
  }


  const handleScehedulePromptChange = () => {
    sendScheduleRequest(taRef.current.value)
    //taRef.current.value = ""
  }

  console.log(dataSource)

  return (
    <div className="w-full h-max bg-gray-200 p-[1vw]">
      <h1 className="text-center text-[24px] font-bold mb-[10px]"> 会议（培训）计划表 </h1>
      <Table components={components} rowClassName={() => 'editable-row'} columns={columns} dataSource={dataSource} bordered showHeader={false} pagination={false}/>
      <div className="flex flex-row justify-start">
        <div className="mt-[20px] flex flex-col justify-center items-center bg-transparent">
          <p> 自定义表格内容和ai生成表格 </p>
          <br/>
          <form onSubmit={handleSubmit}>
            <label htmlFor="region">区域</label>
            <br/>
            <input type="text" id="region" name="region" placeholder="请输入区域"/>
            <br/>
            <label htmlFor="applicant">申请人</label>
            <br/>
            <input type="text" id="applicant" name="applicant" placeholder="请输入申请人"/>
            <br/>
            <label htmlFor="date">申请日期</label>
            <br/>
            <input type="text" id="date" name="date" placeholder="请输入"/>
            <br/>
            <label htmlFor="topic">议题</label>
            <br/>
            <input type="text" id="topic" name="topic" placeholder="请输入"/>
            <br/>
            <label htmlFor="kind">类型</label>
            <br/>
            <input type="text" id="kind" name="kind" placeholder="请输入"/>
            <br/>
            <label htmlFor="number">人数</label>
            <br/>
            <input type="text" id="number" name="number" placeholder="请输入"/>
            <br/>
            <label htmlFor="location">地点</label>
            <br/>
            <input type="text" id="location" name="location" placeholder="请输入"/>
            <br/>
            <label htmlFor="time">时间</label>
            <br/>
            <input type="text" id="time" name="time" placeholder="请输入"/>
            <br/>
            <button type="submit" className="bg-teal-200 w-[50%] mt-[5%] hover:bg-cyan-300 hover:text-stone-600" >提交修改</button>
          </form>
        </div>
        <div className='mt-[20px] ml-[5vw] flex flex-col justify-center items-center bg-transparent'>
          <label htmlFor="story">描述你想要ai生成的议程细节</label>
          <textarea ref={taRef} id="story" name="story" rows="5" cols="33"  placeholder='请输入议程细节'>
          </textarea>
          <button type="submit" className="bg-teal-200 w-[50%] mt-[5%] hover:bg-cyan-300 hover:text-stone-600" onClick={handleScehedulePromptChange}>生成议程</button>
        </div>
      </div>
    </div>
    
  )
}

export default Formpage