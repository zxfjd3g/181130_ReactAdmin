import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Upload, Icon, Modal, message} from 'antd'
import {reqDeleteImg} from '../../api'
import {BASE_IMG_URL} from "../../util/constant";

/*
操作商品图片的照片墙组件
 */
export default class PicturesWall extends Component {

  static propTypes = {
    imgs: PropTypes.array
  }

  state = {
    previewVisible: false, // 是否显示大图预览
    previewImage: '', // 可以预览的大图url
    // file: 代表一个上传文件的相关信息的对象
    fileList: [], // {uid, name, url, status='done'}
  };

  // 获取所有已上传图片文件名的数组
  getImgs = () => {
    return this.state.fileList.map(file => file.name)
  }

  // 取消大图预览(隐藏Modal)
  handleCancel = () => this.setState({previewVisible: false})

  handlePreview = (file) => {
    console.log('handlePreview', file)
    this.setState({
      previewImage: file.url,
      previewVisible: true,
    });
  }

  /*
  文件状态改变的监听回调
    上传中、完成、失败, 删除
    file: 当前操作(上传/删除)的文件对象
    fileList: 所有的文件对象的数组
  */
  handleChange = async ({file, fileList}) => {  // handleChange({fileList, file})

    // 取出上传的file
    console.log('handleChange()', file.status)
    if (file.status === 'done') { // 上传文件成功
      console.log('----', file === fileList[fileList.length - 1])
      file = fileList[fileList.length - 1]
      // 将上传文件的文件名和url保存到file上
      const {name, url} = file.response.data
      file.name = name
      file.url = url
    } else if (file.status === 'removed') { // 删除了fileList中的指定的file
      // 请求后台接口删除对应的文件
      const result = await reqDeleteImg(file.name)
      if(result.status===0) {
        message.success('删除图片成功')
      } else {
        message.error('删除图片失败')
      }
    }

    this.setState({
      fileList
    })
  }

  componentWillMount () {
    const {imgs} = this.props
    if(imgs && imgs.length>0) {
      // 根据传入的imgs生成fileList
      const fileList = imgs.map((img, index) => ({
        uid: -index,
        name: img,
        url: BASE_IMG_URL + img,
        status: 'done'
      }))
      this.setState({
        fileList
      })
    }
  }

  render() {
    const {previewVisible, previewImage, fileList} = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div>
        {/*
        action: 指定上传的后台处理url
        listType: 显示的样式效果
        accept: 接收的文件类型
        fileList: 所有上传图片的相关信息对象的数组
        name: 请求参数的参数名
        onPreview: 点击预览的回调
        onChange:
        */}
        <Upload
          action="/manage/img/upload"
          listType="picture-card"
          accept='image/*'
          fileList={fileList}
          name='image'
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>


        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{width: '100%'}} src={previewImage}/>
        </Modal>
      </div>
    );
  }
}