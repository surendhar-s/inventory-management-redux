import React, { Component } from 'react';
import { connect } from 'react-redux';
import canvasJsReact from '../../canvasJs/canvasjs.react';
import './dashboard.css'
var CanvasJsChart = canvasJsReact.CanvasJSChart

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      productList: [],
      chartOption: [],
      isDataLoading: false,
    }
    this.chartOption = {
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
  getChatData = async () => {
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
    })
    for (let index = 0; index < categoryName.length; index++) {
      this.chartOption.data[0].dataPoints.push({ label: categoryName[index], y: parseFloat(((productInStock[index] / totalProducts) * 100).toFixed(2)) })
    }
  }
  render() {
    this.getChatData()
    return (
      <div className="data-container">
        <h2 className="h2">Dashboard</h2>
        <hr className="hr-align" />
        {this.chartOption.data[0].dataPoints.length !== 0 ? <div style={{ padding: "15px" }}><CanvasJsChart options={this.chartOption} /></div> : <h3 style={{ height: "100px", padding: "15px", textAlign: "center" }}>No product in inventory found, please add!!</h3>}
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
