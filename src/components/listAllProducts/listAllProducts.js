import VisibilityIcon from '@material-ui/icons/Visibility';
import Axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import removeProductFromList from '../../actions/removeProductFromList';
import EnhancedTable from '../tableComponent/tableComponent';
import './listAllProducts.css';

class ListAllProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productsList: this.props.productList,
      searchValue: "",
      initialData: this.props.productList,
      categoryList: [],
      filteredDataByCategory: this.props.productList,
      sortBy: "byName",
      filterBy: "All-Cat",
      isDataLoading: false,
      sortOrder: "ASC",
      itemPerPage: 5
    }
  }
  componentDidMount = async () => {
    this.setState({
      isDataLoading: true
    })
    let category = await Axios.get("https://api.jsonbin.io/b/5f564b42993a2e110d4044b8/category")
    this.setState({
      categoryList: category.data
    })
    let e = {
      target: {
        value: "byName"
      }
    }
    this.sortData(e)
  }
  deleteProduct = async (id) => {
    this.setState({
      isDataLoading: true
    })
    let data = await Axios.delete("https://api.jsonbin.io/b/5f564b42993a2e110d4044b8/products/" + id)
    if (data.status === 200) {
      // if (true) {
      await this.props.removeProductInList({ productId: id })
    }
    this.setState({
      productList: this.props.productList,
      initialData: this.props.productList,
    }, () => {
      let e = {
        target: {
          value: "All-Cat"
        }
      }
      this.filterDataProductByCategory(e)
    })
    this.setState({
      isDataLoading: false
    })
  }
  searchData = (e) => {
    this.setState({
      isDataLoading: true
    })
    let inputValue = e.target.value
    if (inputValue === "") {
      this.setState({
        productsList: this.state.filteredDataByCategory
      })
    }
    else {
      let filteredData = this.state.productsList.filter(data => {
        if (data.productName.toUpperCase().includes(inputValue.toUpperCase()) || data.productDescription.toUpperCase().includes(inputValue.toUpperCase())) {
          return data
        }
        return 0
      })
      this.setState({
        productsList: filteredData
      })
    }
    this.setState({
      isDataLoading: false
    })
  }
  sortData = (e) => {
    this.setState({
      sortBy: e.target.value,
      isDataLoading: true
    }, () => {
      let tempList = this.state.productsList
      let sortOrder = this.state.sortOrder === "ASC" ? true : false
      if (this.state.sortBy === "byName") {
        // let tempList = this.state.productsList
        tempList.sort((a, b) => sortOrder ? a.productName.localeCompare(b.productName) : b.productName.localeCompare(a.productName))
      }
      else if (this.state.sortBy === "byPrice") {
        // let tempList = this.state.productsList
        tempList.sort((a, b) => sortOrder ? parseFloat(a.productPrice) - parseFloat(b.productPrice) : parseFloat(b.productPrice) - parseFloat(a.productPrice))
      }
      else if (this.state.sortBy === "byAvailability") {
        // let tempList = this.state.productsList
        tempList.sort((a, b) => sortOrder ? parseInt(a.productStock) - parseInt(b.productStock) : parseInt(b.productStock) - parseInt(a.productStock))
      }
      else if (this.state.sortBy === "byAddedOn") {
        // let tempList = this.state.productsList
        tempList.sort((a, b) => sortOrder ? moment(a.productAddedOn) - moment(b.productAddedOn) : moment(b.productAddedOn) - moment(a.productAddedOn))
      }
      else if (this.state.sortBy === "byInventoryValue") {
        // let tempList = this.state.productsList
        tempList.sort((a, b) => sortOrder ? (parseFloat(a.productPrice) * parseFloat(a.productStock)) - (parseFloat(b.productPrice) * parseFloat(b.productStock)) : (parseFloat(b.productPrice) * parseFloat(b.productStock)) - (parseFloat(a.productPrice) * parseFloat(a.productStock)))
      }
      this.setState({
        productsList: tempList,
        isDataLoading: false
      })
    })
  }
  filterDataProductByCategory = (e) => {
    this.setState({
      isDataLoading: true
    })
    let filterBy = e.target.value
    if (filterBy === "All-Cat") {
      this.setState({
        productsList: this.props.productList,
        filteredDataByCategory: this.props.productList,
        isDataLoading: false,
      })
    }
    else {
      let tempList = this.state.initialData.filter(data => parseInt(data.productCategory) === parseInt(filterBy))
      this.setState({
        productsList: tempList,
        filteredDataByCategory: tempList,
        isDataLoading: false,
      })
    }
  }
  toggleAscendingOrDecending = () => {
    this.setState({
      sortOrder: this.state.sortOrder === "ASC" ? "DSC" : "ASC"
    }, () => {
      let e = {
        target: {
          value: this.state.sortBy
        }
      }
      this.sortData(e)
    })
  }
  changeItemPerPage = (e) => {
    this.setState({
      itemPerPage: e.target.value
    })
  }
  deleteProductIds = (productIds) => {
    productIds.map(async data => {
      await this.deleteProduct(data)
    })
  }
  render() {
    let tableHeader = [
      { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
      { id: 'category', numeric: false, disablePadding: true, label: 'Category' },
      { id: 'manufracturer', numeric: false, disablePadding: true, label: 'Manufracturer' },
      { id: 'color', numeric: false, disablePadding: true, label: 'Color' },
      { id: 'stock', numeric: true, disablePadding: false, label: 'In-Stock' },
      { id: 'price', numeric: true, disablePadding: false, label: 'Price per Unit' },
      { id: 'inventory', numeric: true, disablePadding: false, label: 'Inventory Value' },
      { id: 'addedOn', numeric: false, disablePadding: true, label: 'Added On' },
      { id: 'updatedOn', numeric: false, disablePadding: true, label: 'Last Updated' },
      { id: 'Action', numeric: false, disablePadding: true, label: 'Action' },
    ];
    let tableData = []
    this.state.productsList.map(data => {
      let id = data.id
      let name = data.productName
      let category = data.productCategoryName
      let subCategory = data.productSubCategory
      let color = data.productColor
      let stock = parseInt(data.productStock)
      let description = data.productDescription
      let addedOn = data.productAddedOn
      let updatedOn = data.productUpdatedOn
      let price = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(data.productPrice)
      let inventory = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(parseFloat(data.productPrice) * parseFloat(data.productStock))
      let viewAction = <Link to={{
        pathname: "/productDetail",
        state: { productData: data }
      }}
        style={{ textDecoration: "none" }}><VisibilityIcon>View</VisibilityIcon></Link>
      tableData.push({
        id,
        name,
        category,
        subCategory,
        color,
        stock,
        price,
        inventory,
        viewAction,
        description,
        addedOn,
        updatedOn
      })
      return 0
    })
    return (
      <div className="data-container">
        <h2 className="h2">Products</h2>
        <hr className="hr-align" />
        <EnhancedTable
          tableData={tableData}
          tableHeader={tableHeader}
          deleteProduct={this.deleteProductIds}
          filterCategory={this.filterDataProductByCategory}
          categoryList={this.state.categoryList}
        />
      </div>
      // <div>
      //   <div style={{ padding: "10px", margin: "0px 80px" }}>
      //     <h3>Product List</h3>
      //     <hr /><br />
      //     <input className="search-bar" placeholder="Search!!" type="search" onChange={this.searchData} />
      //     <button className="sort-by sort-button" onClick={this.toggleAscendingOrDecending}>{this.state.sortOrder}</button>
      //     <select onChange={this.sortData} className="sort-by">
      //       <option disabled>Sort By</option>
      //       <option value="byName" defaultChecked>Name</option>
      //       <option value="byPrice">Price</option>
      //       <option value="byInventoryValue">Inventory Value</option>
      //       <option value="byAvailability">Availabiliy</option>
      //       <option value="byAddedOn">Added on</option>
      //     </select>
      //     <select className="sort-by" onChange={this.filterDataProductByCategory}>
      //       <option disabled>Filter by category</option>
      //       <option value="All-Cat">All Category</option>
      //       {
      //         this.state.categoryList.map(data => {
      //           return <option key={data.id} value={data.id}>{data.categoryName}</option>
      //         })
      //       }
      //     </select>
      //     <div className="table-container">
      //       <LoadingOverlay
      //         active={this.state.isDataLoading}
      //         spinner
      //         text='Loading your products...'
      //       >
      //         {
      //           this.state.productsList.length === 0 ? <h3><span>No product in inventory</span></h3> :
      //             // <table className="product-table">
      //             //   <thead>
      //             //     <tr className="product-table-tr" style={{ background: "#d8d8d861" }}>
      //             //       <th className="product-table-th">Name</th>
      //             //       <th className="product-table-th">Category</th>
      //             //       <th className="product-table-th">In-Stock</th>
      //             //       <th className="product-table-th">Price per Unit</th>
      //             //       <th className="product-table-th">Inventory value</th>
      //             //       <th className="product-table-th" colSpan="2">Action</th>
      //             //     </tr>
      //             //   </thead>
      //             //   <tbody>
      //             //     {this.state.productsList.map(data => {
      //             //       return (
      //             //         <tr className="product-table-tr" key={data.id}>
      //             //           <td className="product-table-td">{data.productName}</td>
      //             //           <td className="product-table-td">{data.productCategoryName}</td>
      //             //           <td className="product-table-td">{data.productStock}</td>
      //             //           <td className="product-table-td">{new Intl.NumberFormat('en-IN', {
      //             //             style: 'currency',
      //             //             currency: 'INR'
      //             //           }).format(data.productPrice)
      //             //           }</td>
      //             //           <td className="product-table-td">{new Intl.NumberFormat('en-IN', {
      //             //             style: 'currency',
      //             //             currency: 'INR'
      //             //           }).format(parseFloat(data.productPrice) * parseFloat(data.productStock))
      //             //           }</td>
      //             //           <td className="product-table-td"><Link to={{
      //             //             pathname: "/productDetail",
      //             //             state: { productData: data }
      //             //           }}
      //             //             style={{ textDecoration: "none" }}><button className="button view-button home-button">View</button></Link></td>
      //             //           <td><button className="button delete-button home-button" onClick={() => this.deleteProduct(data.id)}>Delete</button></td>
      //             //         </tr>
      //             //       );
      //             //     })}
      //             //   </tbody>
      //             // </table>
      //             <React.Fragment>
      //               <TablePagination
      //                 headers={tableHeader}
      //                 data={tableData}
      //                 columns="name.category.stock.price.inventory.viewAction.deleteAction"
      //                 perPageItemCount={this.state.itemPerPage}
      //                 totalCount={tableData.length}
      //               />{tableData.length > 5 ?
      //                 <select onChange={this.changeItemPerPage} style={{ display: "block", margin: "auto" }}>
      //                   <option value={5} defaultChecked>5</option>
      //                   <option value={10}>10</option>
      //                   <option value={20}>20</option>
      //                   <option value={50}>50</option>
      //                 </select>
      //                 : null
      //               }
      //             </React.Fragment>
      //         }
      //       </LoadingOverlay>
      //     </div>
      //   </div>
      // </div >
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
    removeProductInList: removeProductFromList
  }, dispatch)
}
export default connect(mapStoreToProps, mapPropsToStore)(ListAllProducts);
