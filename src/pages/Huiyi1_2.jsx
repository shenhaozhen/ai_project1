import React, { useContext, useEffect, useRef, useState } from 'react';
import {Table, Form, Input, message} from 'antd';
import {fetchFromOpenAI2} from "../api/openai_api"

const individualInfo = [
    {
        name: "陈茂",
        hospital: "四川华西医院",
        department: "心内科",
    },
    {
        name: "曾智",
        hospital: "四川华西医院",
        department: "心脏内科",
    },
    {
        name: "王文艳",
        hospital: "四川省人民医院",
        department: "心血管内科",
    },
    {
        name: "陈茂",
        hospital: "四川华西医院",
        department: "心脏内科",
    },
    {
        name: "黄德嘉",
        hospital: "四川华西医院",
        department: "心脏内科",
    },
    {
        name: "陈玉成",
        hospital: "四川华西医院",
        department: "心脏内科",
    },
    {
        name: "杨庆",
        hospital: "四川华西医院",
        department: "心脏内科",
    },
    {
        name: "贾卫国",
        hospital: "四川华西医院",
        department: "心脏内科",
    },
    {
        name: "陶剑虹",
        hospital: "四川省人民医院",
        department: "心血管内科",
    },
    {
        name: "李小平",
        hospital: "四川省人民医院",
        department: "心血管内科",
    },   
]

let data = [
    {
       name: "会议（培训）时间",
       content: "2023.12.22—2023.12.23", 
    },
    {
       name: "会议（培训）召开地点",
       content: "成都祥宇宾馆",
    },
    {
        name: "主持人",
        content: "王羽",
     },
     {
        name: "参会人员",
        content: "详见签到表",
     },
     {
        name: "记录人",
        content: "李健",
     },
     {
        name: "会议（培训）议题",
        content: "2023年四川医学会心血管内科分会学术年会",
     },
     {
        name: "会议（培训）主要内容",
        content: "2023年12月22—23日，2023年四川医学会心血管内科分会学术年会在成都祥宇宾馆举办，会议以“心血管疾病预防与治疗的新进展”为主题，设置了心血管前沿学术专题报告以及冠脉和心衰相关病例大赛2个，并进行了四川医学会心血管内科分会换届选举工作。四川医学会陈茂会长，华西医院曾智教授，四川省人民医院王文艳教授，华西医院陈玉成教授，华西医院黄德嘉教授，华西医院杨庆教授，华西医院贾卫国教授，四川省人民医院陶剑虹教授，四川省人民医院李小平教授，四川省人民医院尹立雪教授参加了会议，共同研讨交流先进的心血管理念，技术创新与服务经验，展示国内外心血管医学科技发展最新成果，助推心血管医学跨越式发展。开幕式上，陈茂会长向年会成功召开表示热烈的祝贺，希望通过此次会议促进心内科领域专家，学者之间的交流与合作，推动心内科科学，规范，创新发展。进一步加强多学科的合作，建立完善的预防和治疗体系，进一步加强科研和临床实践的结合，推动诊疗技术的创新和发展，进一步加强患者教育和管理，提高患者的自我保护意识和能力。",
     },
]

let rawColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        width: '20%',
    },
    {
        title: 'Content',
        dataIndex: 'content',
        editable: true,
    }

]

const addKeys = (data) => {
    return data.map((item, index) => {
      return {key: index, ...item}
    })
}

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

const Huiyi1_2 = () => {

  const [dataSource, setDataSource] = useState(addKeys(data));
  const textRef = useRef(null)

  const random5Info = () => {
    let info = [...individualInfo]
    //0到9随机整数
    let res = [];
    while (res.length < 5) {
        let index = Math.floor(Math.random() * info.length)
        res.push(info[index])
        info.splice(index, 1)
    }
    res = res.map((item) => {
        return item.hospital + item.department + item.name + "教授"
    })
    return res  
  }
  


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

  const handleClick = async () => {
    let summaryDetails = textRef.current.value;
    let doctors = random5Info();
    let arr = dataSource.filter((item,index) => {
        return index != 3 && index != dataSource.length - 1
    })
    arr = arr.map((item) => {
            return item.name + ":" + item.content
    })
    let backgroundInfo = arr.join(',')
    let sysMessage = "以###之间的内容为模板，根据用户给出的信息，生成类似的会议主要内容" + "###会议主要内容：" + dataSource[6].content+"###";
    let userMessage = `给出以下信息:${backgroundInfo}, 参与人员包括${doctors.join(',')}`;
    if (summaryDetails != "") {
        userMessage +=  `，再包含以下内容：${summaryDetails}`
    }
    userMessage += "，生成一份会议培训主要内容"
    let res = await fetchFromOpenAI2(sysMessage, userMessage)
    res = res.choices[0].message.content
    let newData = [...dataSource]
    newData[6].content = res
    setDataSource(newData)
  }

  return (
    <div className="text-center w-full h-max bg-gray-200 px-[2vw] pt-[10px]">
      <h1 className="font-bold text-3xl">会议(培训)纪要</h1>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
        showHeader={false}
        pagination={false}
      />
        <div className='mt-[10px] ml-[5vw] flex flex-col justify-center items-center bg-transparent'>
          <label htmlFor="summary">补充一些主要内容细节</label>
          <textarea ref={textRef} id="summary" name="summary" rows="5" cols="33"  placeholder='请输入主要内容的一些细节'>
          </textarea>
          <button type="submit" className="bg-teal-200 w-max px-[1vw] mt-[1] hover:bg-cyan-300 hover:text-stone-600" onClick={handleClick}>生成议程</button>
        </div>
    </div>
  );
}

export default Huiyi1_2