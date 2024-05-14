import React, { useContext, useEffect, useRef, useState } from 'react';
import {Form, Input, Table } from 'antd';
import {fetchFromOpenAI2} from "../api/openai_api"
import { redirect } from 'react-router-dom';

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

let data = [
    {
       number : '1',
       category: '推广范围',
       work: '全国',
       content: '',
    },
    {
        number : '1',
        category: '推广范围',
        work: '跨区域',
        content: '',
     },
     {
        number : '1',
        category: '推广范围',
        work: '省级',
        content: '√',
     },
     {
        number : '1',
        category: '推广范围',
        work: '市级',
        content: '√',
     },
     {
        number : '1',
        category: '推广范围',
        work: '县级',
        content: '',
     },
     {
        number : '1',
        category: '推广范围',
        work: '院级',
        content: '',
     },
     {
        number : '2',
        category: '推广对象',
        work: '医院',
        content: '1家省级医院，2家市级医院医院 1、浙江大学医学院附属邵逸夫医院（省级）2、舟山市人民医院（市级）3．宁波市第一人民医院（市级）连锁药店',
     },
     {
        number : '2',
        category: '推广对象',
        work: '连锁药店',
        content: '',
     },
     {
        number : '2',
        category: '推广对象',
        work: '商业',
        content: '',
     },
     {
        number : '2',
        category: '推广对象',
        work: '新品上市',
        content: '',
     },
     {
        number : '3',
        category: '服务品种',
        work: '',
        content: '千红怡达',
    },
    {
        number : '4',
        category: '竞品信息收集情况',
        work: '品名',
        content: '肝素钠注射液',
    },
    {
        number : '4',
        category: '竞品信息收集情况',
        work: '厂家',
        content: '上海生化制药股份有限公司',
    },
    {
        number : '4',
        category: '竞品信息收集情况',
        work: '价格',
        content: '19.8',
    },
    {
        number : '4',
        category: '竞品信息收集情况',
        work: '规格',
        content: '2ml:12500',
    },
    {
        number : '4',
        category: '竞品信息收集情况',
        work: '渠道供应商',
        content: '华东医药有限公司、浙江大丛林医药有限公司 、宁波医药股份有限公司',
    },
    {
        number : '4',
        category: '竞品信息收集情况',
        work: '市场占有情况',
        content: '日前竞品在舟山市人民医院，宁波市人民医院，部逸夫医院均有销售，均有销售，且均在15000支',
    },
    {
        number : '4',
        category: '竞品信息收集情况',
        work: '患者反馈',
        content: `不良反应是用药过多可致自发性出血，故每次注射前应测定凝血时间，如注射后引起严重出血，可静注硫酸鱼精蛋白进行急救（1mg硫酸鱼精蛋白可中和150U肝素）。偶可引起过敏反患者反馈应及血小板减少常发生在用药初5～9天，故开始治疗1个月内应定期监测血小板计数，偶见一次性脱发和腹泻。尚可引起骨质疏松和自发性骨折。肝功能不良者长期使用可引起抗凝血酶—I耗竭面血栓形成倾向。`,
    },
    {
        number : '5',
        category: '我方产品在调研方面的优势',
        work: '',
        content: `1．使用千红怡达可有效降低导管相关性血流感染发生的风险 2．我们产品可以保持管道通畅，减少少药物之间的配伍禁忌，防止血液回流 3．遵循一瓶药水只注射一人的规定 4、一人—针一管一用尽可能使用单剂量注射用药品5、避免共用麻醉剂、共用肝素溶液封管、共用眼内抗生素注射剂等 6、安全、有效、方便，全国护理操作规范推荐、大量文献支持、减少护理工作量 7、与别的封管注射用相比，具有防血栓、抗感染肝素具有双重药理作用，有效预防导管相关性血栓和导管相关性血流感染，而生理盐水完全不具备这两方面的作用 8、剂量准确，合法合规、防止感染，打开即`
    },
    {
        number : '6',
        category: '推广方式',
        work: '物料准备情况',
        content: '寻找广告公司，制作公司宣传手册，易拉宝, 买点日常生活用品，并印上公司的logo',
    },
    {
        number : '6',
        category: '推广方式',
        work: '会议，活动的组织情况',
        content: '通过“千红怡达”沙龙会议和邀请邵逸夫外科手术室主任王勇科组织科室会，详细介绍千红怡达作用于患者的疗效，以及与其他同类产品会议、活动的组织对比之下，千红怡达的优势。根据3家医院门诊接诊人次，住院患者，准备向患者发放宣传册，毛巾，并利用门诊宣传媒介播放宣传视频。 通过3家医院的结构，影响力，增加千红怡达的知名度'
    },
    {
        number : '6',
        category: '推广方式',
        work: '采用广告，刊发宣传性文章或信息，微信等渠道的情况',
        content: '利用医院学术会平台一级千红学术会平台，宜传相关信息，让患者跟清楚了解产品',
    },
    {
        number : '6',
        category: '推广方式',
        work: '产品性能功效推介（聘请嘉宾，讲师等）',
        content: '邀请浙江知名专家间宏志进行讲解，并邀请舟山市人民医院李长青主任介绍在使用千红恰达的疗效，让使用良好的医生进行讲解，增加平拍的领名度',
    },
    {
        number : '6',
        category: '推广方式',
        work: '市场准入调研',  
        content: '浙江大学医学院附属邵逸夫医院和宁波市第一人民医院每年会有针对非基药、非国谈的品种市场准入调研的新药讨论会，但名额很少， 该产品为慢病用药，不在药品使用监控目录范围内，不存在价格倒挂限制',
    },
    {
        number : '6',
        category: '推广方式',
        work: '问卷调查',
        content: '发放给住院患者和一线医生，了解他们的结问卷调研构，以及患者使用后对公司的测评，方便专家宣讲',
    },
    {
        number : '6',
        category: '推广方式',
        work: '患者宣传活动',
        content: '在门诊和住院部显示屏通过生动的动画展示不适用怡达的危害，让患者更清楚了解产品',
    },
];

const addKeys = (data) => {
    return data.map((item, index) => {
      return {key: index, ...item}
    })
}

const MP_1 = () => {
  const [dataSource, setDataSource] = useState(addKeys(data));
  const competitorRef = useRef(null);
  const productRef = useRef(null);  
  const promotionRef = useRef(null);


  let rawColumns = [
    {
        title: "Number",
        dataIndex: "number",
        width: '5%',
        onCell : (record, index) => {
            let slow = 0;
            let fast = 0;
            let no_1 = dataSource.filter((item) => item.number == 1).length
            fast += no_1;
            if (index == slow) {
               return { rowSpan: no_1 }
            }
            if (index > slow && index < fast) {
                return {rowSpan: 0}
            }
            slow += no_1;

            let no_2 = dataSource.filter((item) => item.number == 2).length
            fast += no_2
            if (index == slow) {
               return { rowSpan: no_2 }
            }
            if (index > slow && index < fast) {
                return {rowSpan: 0}
            }
            slow += no_2;
            slow += 1;
            fast += 1;
            let no_4 = dataSource.filter((item) => item.number == 4).length
            fast += no_4;
            if (index == slow) {
                return { rowSpan: no_4 }
            }
            if (index > slow && index < fast) {
                return {rowSpan: 0}
            }
            slow += no_4;
            slow += 1;
            fast += 1;
            let no_6 = dataSource.filter((item) => item.number == 6).length
            fast += no_6;
            if (index == slow) {
                return { rowSpan: no_6 }
            }
            if (index > slow && index < fast) {
                return {rowSpan: 0}
            }
        }
    },
    {
        title: "Category",
        dataIndex: "category",
        width: '15%',    
        onCell : (record, index) => {
            let slow = 0;
            let fast = 0;
            let no_1 = dataSource.filter((item) => item.category == "推广范围").length
            fast += no_1
            if (index == slow) {
               return { rowSpan: no_1 }
            }
            if (index > slow && index < fast) {
                return {rowSpan: 0}
            }
            slow += no_1
            let no_2 = dataSource.filter((item) => item.category == "推广对象").length
            fast += no_2
            if (index == slow) {
               return { rowSpan: no_2 }
            }
            if (index > slow && index < fast) {
                return {rowSpan: 0}
            }
            slow += no_2
            slow += 1;
            fast += 1;
            let no_4 = dataSource.filter((item) => item.category == "竞品信息收集情况").length
            fast += no_4
            if (index == slow) {
               return { rowSpan: no_4 }
            }
            if (index > slow && index < fast) {
                return {rowSpan: 0}
            }
            slow += no_4;
            slow += 1;
            fast += 1;
            let no_6 = dataSource.filter((item) => item.category == "推广方式").length
            fast += no_6
            if (index == slow) {
               return { rowSpan: no_6 }
            }
            if (index > slow && index < fast) {
                return {rowSpan: 0}
            }
        }
    },
    {
        title: "Work",
        dataIndex: "work",
    },
    {
        title: "Content",
        dataIndex: "content",
        editable: true,
    }

  ]


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


  const handleCompetitorClick = async () => {
    let competitor = competitorRef.current.value  
    if (competitor == "") {
       return
    }
    let wantedInfo = dataSource.filter((item) => item.number == "4")
    wantedInfo = wantedInfo.map((item) => {
       return item.work
    })
    wantedInfo = wantedInfo.join(",")
    let sysMessage = "";
    let userMessage = `给我关于${competitor}的信息，包括${wantedInfo}，返回结果用json字符串的格式`
    let res = await fetchFromOpenAI2(sysMessage, userMessage)
    res = res.choices[0].message.content
    res = JSON.parse(res)
    // add (key,value) from res to an array
    let newData = [...data]

    newData = newData.map((item) => {
        if (item.category == "竞品信息收集情况") {
            return {...item, content: res[item.work]}
        }
        return item
    })

    setDataSource(addKeys(newData))
    
  }


  const handleProductClick = async () => {
    let product = productRef.current.value
    if (product == "") {
       return
    }
    let sysMessage = "";
    let userMessage = `告诉我产品${product}比起它的竞品有哪些优势`
    let res = await fetchFromOpenAI2(sysMessage, userMessage)
    res = res.choices[0].message.content
    
    let newData = [...data]
    newData = newData.map((item) => {
        if (item.category == "服务品种") {
            return {...item, content: product}
        }
        if (item.category == "我方产品在调研方面的优势") {
            return {...item, content: res}
        }
        return item       
    })
    setDataSource(addKeys(newData))
    }


    let sampleRes = [
        "",
        "物料准备情况：\n为活动准备宣传资料、产品样品、产品说明书、宣传海报、宣传单页等物料，确保有足够的数量以及高质量的印刷制作。\n\n",
        "会议，活动的组织情况：\n安排专业的活动策划团队，制定详细的活动方案和流程。包括会议场地预订、嘉宾邀请、活动日程安排、现场布置、人员配备等方面的组织工作。\n\n",
        "采用广告，刊发宣传性文章或信息，微信等渠道的情况：\n利用各种广告渠道，如电视、广播、报纸、杂志等，发布产品广告。在权威医疗专业媒体上刊发宣传性文章，增加产品曝光度。同时，通过微信、微博等社交媒体平台，开展线上推广活动，提升产品知名度和影响力。\n\n",
        "产品性能功效推介（聘请嘉宾，讲师等）：\n邀请权威专家、医生或药学教授作为嘉宾，进行产品性能功效的推介和解读。通过专业的讲座、研讨会等形式，向目标受众传达产品优势和功效，提升产品可信度和认可度。\n\n",
        "市场准入调研：\n进行市场准入调研，了解目标市场需求、竞争对手情况、市场潜力等信息，为产品推广提供科学依据和战略指导。确保推广策略具有针对性和可操作性。\n\n",
        "问卷调查：\n设计并实施问卷调查，收集目标客户对产品的需求、看法和反馈意见。通过问卷调查结果，不断优化产品推广策略，提高推广效果和客户满意度。\n\n",
        "患者宣传活动：\n结合医院、诊所等医疗机构资源，开展患者宣传活动。通过健康讲座、健康义诊、健康体检等形式，向患者宣传产品的疗效和适用范围，引导患者认可和选择该产品。\n\n",
        "产品与药品相关推广方案：\n遵守相关法规和规定，采取合法合规的方式推广产品与药品相关信息。结合医药广告法规要求，借助各类渠道和活动形式，传递产品的安全性、有效性和适用性等信息。同时，加强产品宣传中的科学合理性和诚信守信原则，确保推广效果和用户信赖度。"
    ]

    const handleRes =  () => {
        let res = sampleRes.filter ((item) => item != "")
        res = res.map((item) => {
            return item.split("：")
        })
        console.log(res)
    }


  const handlePromotionClick = async () => {
    let promotion = promotionRef.current.value
    if (promotion == "") {
       return
    }
    let bgInfo = dataSource.filter((item) => item.category == "推广方式")
    bgInfo = bgInfo.map((item) => {
       return item.work
    })
    bgInfo = bgInfo.join(",")

    let sysMessage = "你是一个专业的产品推销人员，根据用户的需求帮用户设计推销产品的方案";
    let userMessage = `给我一个包括${bgInfo}，并且产品与${promotion}有关推广方案， 每一条用###隔开`
    let res = await fetchFromOpenAI2(sysMessage, userMessage)
    res = res.choices[0].message.content
    res = res.split("###")
    res = res.filter((item) => item != "")
    res = res.map((item) => {
        let temp;
        if (item.indexOf("：") != -1) {
            temp = item.split("：")
        } else if (item.indexOf("\n") != -1) {
             temp = item.split("\n")
        } else {
             temp = items.split("\n\n")
        }
        console.log(temp)
        return {number: "6", category: "推广方式", work: temp[0], content: temp[1]}
    })
    let newData = [...data]
    newData = newData.filter((item) => item.category != "推广方式")
    newData = newData.concat(res)
    setDataSource(addKeys(newData))
  }

  return (
    <div className="text-center px-[2vw] bg-gray-200 pt-[10px]">
      <h1 className="text-3xl font-bold mb-[5px]"> 市场推广服务确认表 </h1>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
      <div className="flex flex-row gap-[2vw]">
        <div className='mt-[10px] ml-[5vw] flex flex-col justify-center items-center bg-transparent'>
          <label htmlFor="competitor">生成竞品信息</label>
          <textarea ref={competitorRef} id="competitor" name="competitor" rows="5" cols="33"  placeholder='请输入竞品名称'>
          </textarea>
          <button type="submit" className="bg-teal-200 w-max px-[1vw] mt-[1] hover:bg-cyan-300 hover:text-stone-600" onClick={handleCompetitorClick}> 生成竞品信息</button>
        </div>
        <div className="flex flex-col mt-[10px] items-center">
            <label htmlFor="product">服务品种</label>
            <input type="text" id="product" name="product" ref={productRef}/>   
            <button className="bg-teal-200 w-max px-[1vw] mt-[1] hover:bg-cyan-300 hover:text-stone-600" onClick={handleProductClick}> 提交 </button>
        </div>
        <div className='mt-[10px] ml-[5vw] flex flex-col justify-center items-center bg-transparent'>
          <label htmlFor="promotion">生成推广方式方案</label>
          <textarea ref={promotionRef} id="promotion" name="promotion" rows="5" cols="33"  placeholder='请输入关于推广方案的细节'>
          </textarea>
          <button type="submit" className="bg-teal-200 w-max px-[1vw] mt-[1] hover:bg-cyan-300 hover:text-stone-600" onClick={handlePromotionClick}> 生成推广方案</button>
        </div>
      </div>
    </div>
  );
};

export default MP_1