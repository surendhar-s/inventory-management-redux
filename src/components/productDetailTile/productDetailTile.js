import React, { Component } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment'
import './productDetailTile.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import editProductInList from '../../actions/editProductInList';

class ProductDetailTile extends Component {
  constructor(props) {
    super(props)
    // if (localStorage.getItem("userId") === null) {
    // console.log("Should redirect",this.props.history.on.match);
    // this.props.history.match.path("/login")
    // }
    this.state = {
      productName: "",
      id: 0,
      productPrice: 0,
      productCategory: "",
      productStock: 0,
      productDescription: "",
      productAddedOn: "",
      productUpdatedOn: "",
      productSubCategory: "",
      productColor: "",
      isEditable: false,
      categoryName: "",
      errors: {
        name: '',
        quantity: '',
        price: '',
        description: '',
      },
    }
    this.intialStateValues = {
      initialProductName: this.props.location.state.productData.productName,
      initialPd: this.props.location.state.productData.id,
      initialProductPrice: this.props.location.state.productData.productPrice,
      initialProductCategory: this.props.location.state.productData.productCategory,
      initialProductStock: this.props.location.state.productData.productStock,
      initialProductAddedOn: this.props.location.state.productData.productAddedOn,
      initialProductUpdatedOn: this.props.location.state.productData.productUpdatedOn,
      initialProductDescription: this.props.location.state.productData.productDescription,
      initialProductCategoryName: this.props.location.state.productData.productCategoryName,
      initialProductSubCategory: this.props.location.state.productData.productSubCategory,
      initialProductColor: this.props.location.state.productData.productColor
    }
  }
  setErrorFiled = (fieldName, filedValue) => {
    let errors = this.state.errors
    switch (fieldName) {
      case 'name':
        errors.name = filedValue === "" ? 'Product name should not be empty' : ''
        break;
      case 'price':
        errors.price = filedValue === "" || parseInt(filedValue) <= 0 ? 'Price should be greater than 0' : ''
        break;
      case 'quantity':
        errors.quantity = filedValue === "" || parseInt(filedValue) <= 0 ? 'Quantity should be greater than or equal to 1' : ''
        break;
      case 'description':
        errors.description = filedValue.length <= 9 ? 'Description should have minimum of 10 character' : ''
        break;
      default:
        break;
    }
    this.setState({ errors, [fieldName]: filedValue });
  }
  componentDidMount = () => {
    this.setState({
      productName: this.props.location.state.productData.productName,
      id: this.props.location.state.productData.id,
      productPrice: this.props.location.state.productData.productPrice,
      productCategory: this.props.location.state.productData.productCategory,
      productStock: this.props.location.state.productData.productStock,
      productDescription: this.props.location.state.productData.productDescription,
      productAddedOn: this.props.location.state.productData.productAddedOn,
      productUpdatedOn: this.props.location.state.productData.productUpdatedOn,
      productCategoryName: this.props.location.state.productData.productCategoryName,
      productSubCategory: this.props.location.state.productData.productSubCategory,
      productColor: this.props.location.state.productData.productColor,
    })
  }

  toggleEditable = () => {
    this.setState({
      isEditable: true
    })
  }
  setNameValue = (e) => {
    this.setErrorFiled(e.target.name, e.target.value)
    this.setState({ productName: e.target.value })
  }
  setQuantity = (e) => {
    this.setErrorFiled(e.target.name, e.target.value)
    this.setState({ productStock: e.target.value })
  }
  setDescription = (e) => {
    this.setErrorFiled(e.target.name, e.target.value)
    this.setState({ productDescription: e.target.value })
  }
  setPricePerUnit = (e) => {
    this.setErrorFiled(e.target.name, e.target.value)
    this.setState({ productPrice: e.target.value })
  }
  editData = async () => {
    let data = await Axios.put("https://api.jsonbin.io/b/5f564b42993a2e110d4044b8/products/" + this.state.id, {
      productCategory: this.state.productCategory,
      productName: this.state.productName,
      productStock: this.state.productStock,
      productPrice: this.state.productPrice,
      productDescription: this.state.productDescription,
      productAddedOn: this.state.productAddedOn,
      productUpdatedOn: moment(),
      productSubCategory: this.state.productSubCategory,
      productColor: this.state.productColor,
      productUserId: localStorage.getItem("userId")
    })
    if (data.status === 200) {
      data.data["productCategoryName"] = this.intialStateValues.initialProductCategoryName
      this.props.editProductInStore({ updatedData: data.data })
    }
    this.setState({
      productName: data.data.productName,
      productStock: data.data.productStock,
      productPrice: data.data.productPrice,
      productDescription: data.data.productDescription,
      isEditable: false
    })
  }
  cancelEdit = () => {
    this.setState({
      productName: this.intialStateValues.initialProductName,
      productPrice: this.intialStateValues.initialProductPrice,
      productStock: this.intialStateValues.initialProductStock,
      productDescription: this.intialStateValues.initialProductDescription,
      isEditable: false
    })
  }
  getTimeFromString = (dataInString) => {
    let momnetObject = moment(dataInString)
    return momnetObject.format("DD/MM/yyyy")
  }
  validateForm = () => {
    if (this.state.errors.name === "" &&
      this.state.errors.price === "" &&
      this.state.errors.description === "" &&
      this.state.errors.quantity === "") {
      return false
    }
    else {
      return true
    }
  }
  isSameForUpdate = () => {
    if (this.state.productName !== this.intialStateValues.initialProductName ||
      this.state.productStock !== this.intialStateValues.initialProductStock ||
      this.state.productDescription !== this.intialStateValues.initialProductDescription ||
      this.state.productPrice !== this.intialStateValues.initialProductPrice
    ) {
      return false
    }
    else {
      return true
    }
  }
  render() {
    const { errors } = this.state
    let isSubmissionDisabled = this.validateForm() || this.isSameForUpdate()
    return (
      <div>
        <Header />
        <div className="main-container">
          {this.state.isEditable ? <div className="product-detail-container flex-container">
            <h2 className="h2">Edit Product Details</h2>
            <hr />
            <div>
              <div className="flex-area">
                <label className="data-item">Name: </label>
                <input className="form-input editable data-item" type="text" name="name" defaultValue={this.intialStateValues.initialProductName} onChange={this.setNameValue} />
                {errors.name.length > 0 && <span className='error'>{errors.name}</span>}
              </div>
              <div className="flex-area">
                <label className="data-item">Price per Unit: </label>
                <input className="form-input editable data-item" type="number" name="price" defaultValue={parseInt(this.intialStateValues.initialProductPrice)} onChange={this.setPricePerUnit} />
                {errors.price.length > 0 && <span className='error'>{errors.price}</span>}
              </div>
              <div className="flex-area">
                <label className="data-item">Quantity: </label>
                <input className="form-input editable data-item" type="number" name="quantity" defaultValue={parseInt(this.intialStateValues.initialProductStock)} onChange={this.setQuantity} />
                {errors.quantity.length > 0 && <span className='error'>{errors.quantity}</span>}
              </div>
              <div className="flex-area">
                <label className="data-item">Descrption: </label>
                <input className="form-input editable data-item" type="text" name="description" defaultValue={this.intialStateValues.initialProductDescription} onChange={this.setDescription} />
                {errors.description.length > 0 && <span className='error'>{errors.description}</span>}
              </div>
              <div className="flex-area button-holder">
                <button className="operational-button" onClick={this.editData} disabled={isSubmissionDisabled}><span>Save</span></button>
                <button className="operational-button" onClick={this.cancelEdit}>Cancel</button>
                <span></span>
              </div>
            </div>
          </div> : <div>
              <h2 className="h2">Product Detail</h2>
              <hr />
              <table className="product-detail-container">
                <tbody>
                  <tr>
                    <td>
                      <h3>Name:</h3>
                    </td>
                    <td>{this.state.productName}</td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Manufracturer:</h3>
                    </td>
                    <td>{this.state.productCategoryName}</td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Category:</h3>
                    </td>
                    <td>{this.state.productSubCategory}</td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Color:</h3>
                    </td>
                    <td>{this.state.productColor}</td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Price:</h3>
                    </td>
                    <td>{new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR'
                    }).format(this.state.productPrice)}</td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Quantity:</h3>
                    </td>
                    <td>{this.state.productStock}</td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Inventory Value:</h3>
                    </td>
                    <td>{new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR'
                    }).format(parseFloat(this.state.productPrice) * parseFloat(this.state.productStock))}</td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Description</h3>
                    </td>
                    <td style={{ lineHeight: "1.9rem" }}>{this.state.productDescription}</td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Added on:</h3>
                    </td>
                    <td>{this.getTimeFromString(this.state.productAddedOn)}</td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Last Updated:</h3>
                    </td>
                    <td>{!this.state.productUpdatedOn ? <span>NA</span> : this.getTimeFromString(this.state.productUpdatedOn)}</td>
                  </tr>
                  <tr style={{ textAlignLast: "center" }}>
                    <td>
                      <button className="operational-button" data-testid="edit-button" onClick={this.toggleEditable}><span>Edit</span></button>
                    </td>
                    <td><Link to="/"><button className="operational-button">Back</button></Link></td>
                  </tr>
                </tbody>
              </table>
            </div>
          }
        </div>
        <Footer />
      </div>
    );
  }
}

function mapPropsToStore(dispatch) {
  return bindActionCreators({
    editProductInStore: editProductInList
  }, dispatch)
}
export default connect(null, mapPropsToStore)(ProductDetailTile)
