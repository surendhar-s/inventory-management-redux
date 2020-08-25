import React, { Component } from 'react';
import { connect } from 'react-redux';
import canvasJsReact from '../../canvasJs/canvasjs.react';
import './dashboard.css'
import { Button } from '@material-ui/core';
var CanvasJsChart = canvasJsReact.CanvasJSChart

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      productList: [],
      chartOption: [],
      isDataLoading: false,
      chartType: "manufracturer"
    }
    this.chartOption = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "dark2", // "light1", "dark1", "dark2"
      title: {
        text: "Products Vs Manufracturer"
      },
      axisX: {
        title: "Manufracturer"
      },
      axisY: {
        title: "Product in stock"
      },
      data: [{
        type: "bar",
        indexLabel: "{label}: {y}%",
        dataPoints: []
      }]
    }
    this.chartOption1 = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "dark2", // "light1", "dark1", "dark2"
      title: {
        text: "Products Vs Category"
      },
      axisX: {
        title: "Category"
      },
      axisY: {
        title: "Product in stock"
      },
      data: [{
        type: "bar",
        indexLabel: "{label}: {y}%",
        dataPoints: []
      }]
    }
  }
  setChartType = (type) => {
    this.setState({
      chartType: type
    })
  }
  getChatDataForManufracturer = async () => {
    let categoryName = []
    let productInStock = []
    let totalProducts = 0
    this.props.productList.map(data => {
      let indices = categoryName.findIndex(e => e === data.productCategoryName)
      if (indices === -1) {
        categoryName.push(data.productCategoryName)
        productInStock.push(parseFloat(data.productStock))
      }
      else {
        productInStock[indices] = productInStock[indices] + parseFloat(data.productStock)
        totalProducts += productInStock[indices]
      }
      return 0
    })
    this.chartOption.data[0].dataPoints = []
    for (let index = 0; index < categoryName.length; index++) {
      this.chartOption.data[0].dataPoints.push({ label: categoryName[index], y: parseFloat(((productInStock[index] / totalProducts) * 100).toFixed(2)) })
    }
  }
  getChatDataForCategoty = () => {
    let categoryName = []
    let productInStock = []
    let totalProducts = 0
    this.props.productList.map(data => {
      let indices = categoryName.findIndex(e => e === data.productSubCategory)
      if (indices === -1) {
        categoryName.push(data.productSubCategory)
        productInStock.push(parseFloat(data.productStock))
      }
      else {
        productInStock[indices] = productInStock[indices] + parseFloat(data.productStock)
        totalProducts += productInStock[indices]
      }
      return 0
    })
    this.chartOption1.data[0].dataPoints = []
    for (let index = 0; index < categoryName.length; index++) {
      this.chartOption1.data[0].dataPoints.push({ label: categoryName[index], y: parseFloat(((productInStock[index] / totalProducts) * 100).toFixed(2)) })
    }
  }
  render() {
    this.getChatDataForManufracturer()
    this.getChatDataForCategoty()
    return (
      <div className="data-container">
        <h2 className="h2">Dashboard</h2>
        <hr className="hr-align" />
        <div>
          <Button variant="outlined" color="secondary" className="dashboard-buttons" onClick={() => this.setChartType("manufracturer")}>Manufracturer</Button>
          <Button variant="outlined" color="secondary" className="dashboard-buttons" onClick={() => this.setChartType("category")}>Category</Button>
        </div>
        {this.state.chartType === "manufracturer" ? <div>{this.chartOption.data[0].dataPoints.length !== 0 ? <div style={{ padding: "15px" }}><CanvasJsChart options={this.chartOption} /></div> : <h3 style={{ height: "100px", padding: "15px", textAlign: "center" }}>No product in inventory found, please add!!</h3>} </div> : null}
        {this.state.chartType === "category" ? <div>{this.chartOption1.data[0].dataPoints.length !== 0 ? <div style={{ padding: "15px" }}><CanvasJsChart options={this.chartOption1} /></div> : <h3 style={{ height: "100px", padding: "15px", textAlign: "center" }}>No product in inventory found, please add!!</h3>} </div> : null}
      </div>
    );
  }
}
function mapPropsToState(store) {
  return {
    productList: store.productList
  }
}
export default connect(mapPropsToState)(Dashboard);
