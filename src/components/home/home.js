import React, { Component } from 'react';
import Header from '../header/header';
import './home.css'
import Footer from '../footer/footer';
import Dashboard from "../dashboard/dashboard";
import ListAll from "../listAllProducts/listAllProducts";
import AddOrEditProduct from '../addOrEditProduct/addOrEditProduct';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import initialDataFetch from "../../actions/intialFetch";
import Axios from 'axios';
import { Button } from '@material-ui/core';
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDashboardSelected: true,
      isListAllSelected: false,
      isAddProductSelected: false,
      forceUpadeEnabledForListAll: false,
      productList: []
    }
  }
  componentDidMount = async () => {
    let produtData = await Axios.get("https://api.jsonbin.io/b/5f564b42993a2e110d4044b8/products?productUserId=" + localStorage.getItem("userId"))
    let categoryList = await Axios.get("https://api.jsonbin.io/b/5f564b42993a2e110d4044b8/category")
    let list = []
    if (produtData.data.length !== 0) {
      let categoryId = await categoryList.data.map(a => parseInt(a.id))
      let categoryName = await categoryList.data.map(a => a.categoryName)
      produtData.data.map(singleProduct => {
        let index = categoryId.findIndex(e => e === parseInt(singleProduct.productCategory))
        let catName = categoryName[index];
        singleProduct["productCategoryName"] = catName
        list.push(singleProduct)
        return 0
      })
      this.props.setProductList({ list: list })
    }
  }
  gotCallBackFromAddProduct = () => {
    this.setState({
      isDashboardSelected: false,
      isListAllSelected: true,
      isAddProductSelected: false,
      forceUpadeEabledForListAll: true
    })
  }
  render() {
    return (
      <div>
        <Header />
        <div className="main-container">
          {/* <div className="home-button-container">
            <button className="button home-button" onClick={() => this.setState({ isDashboardSelected: true, isListAllSelected: false, isAddProductSelected: false, forceUpadeEnabledForListAll: false })}>Dashboard</button>
            <button className="button home-button" onClick={() => this.setState({ isDashboardSelected: false, isListAllSelected: true, isAddProductSelected: false, forceUpadeEnabledForListAll: false })}>ListAll</button>
            <button className="button home-button" onClick={() => this.setState({ isDashboardSelected: false, isListAllSelected: false, isAddProductSelected: true, forceUpadeEnabledForListAll: false })}>Add Product</button>
          </div> */}
          {/* <div className="navbar-container">
            <a className={this.state.isDashboardSelected ? "navbar-items isSelected disable-navbar-left-margin" : "navbar-items disable-navbar-left-margin"} onClick={() => this.setState({ isDashboardSelected: true, isListAllSelected: false, isAddProductSelected: false, forceUpadeEnabledForListAll: false })}>Dashboard</a>
            <a className={this.state.isListAllSelected ? "navbar-items isSelected" : "navbar-items"} onClick={() => this.setState({ isDashboardSelected: false, isListAllSelected: true, isAddProductSelected: false, forceUpadeEnabledForListAll: false })}>ListAll</a>
            <a className={this.state.isAddProductSelected ? "navbar-items isSelected" : "navbar-items"} onClick={() => this.setState({ isDashboardSelected: false, isListAllSelected: false, isAddProductSelected: true, forceUpadeEnabledForListAll: false })}>Add Product</a>
          </div> */}
          {/* <hr /> */}
          <div className="navbar-container">
            <Button color="primary" className={this.state.isDashboardSelected ? "isSelected" : ""} onClick={() => this.setState({ isDashboardSelected: true, isListAllSelected: false, isAddProductSelected: false, forceUpadeEnabledForListAll: false })}>Dashboard</Button>
            <Button color="primary" className={this.state.isListAllSelected ? "isSelected" : ""} onClick={() => this.setState({ isDashboardSelected: false, isListAllSelected: true, isAddProductSelected: false, forceUpadeEnabledForListAll: false })}>ListAll</Button>
            <Button color="primary" className={this.state.isAddProductSelected ? "isSelected" : ""} onClick={() => this.setState({ isDashboardSelected: false, isListAllSelected: false, isAddProductSelected: true, forceUpadeEnabledForListAll: false })}>Add Product</Button>
          </div>
          {this.state.isDashboardSelected ? <Dashboard /> : null}
          {this.state.isListAllSelected ? <ListAll forceUpadeEnabled={this.state.forceUpadeEnabledForListAll} /> : null}
          {this.state.isAddProductSelected ? <AddOrEditProduct callBackFunctionToHome={this.gotCallBackFromAddProduct} /> : null}
        </div>
        <Footer />
      </div >
    );
  }
}
function mapStoreToProps(store) {
  return {
    productList: store.productList
  }
}
function mapPropsToStore(dispatch) {
  return bindActionCreators({
    setProductList: initialDataFetch
  }, dispatch)
}
export default connect(mapStoreToProps, mapPropsToStore)(withRouter(Home));