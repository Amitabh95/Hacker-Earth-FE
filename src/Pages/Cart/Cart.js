import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';

import styles from './Cart.module.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import ItemJSON from '../../Data/Data.json';
import LoaderComponent from '../../Components/Loader/Loader';

class Cart extends Component {

    state = {
        itemData: ItemJSON,
        cartData: null,
        loading: true,
        totalItems: 0,
        totalAmount: 0,
        totalDiscount: 0,
        totalTypeDiscount: 0
    }

    componentDidMount() {
        this.reloadData();
    }

    countItemPrice(data) {
        let totalItems = 0, totalAmount = 0, totalDiscount = 0, totalTypeDiscount = 0;

        // eslint-disable-next-line array-callback-return
        data.map(item => {
            totalItems = totalItems + item.qty;
            totalAmount = totalAmount + (item.qty * item.price);
            totalDiscount = totalDiscount + ((item.qty * item.price) * item.discount / 100);
            if (item.type === 'fiction') {
                totalTypeDiscount = totalTypeDiscount + ((item.qty * item.price) * 0.15);
            }
        })
        this.setState({ totalItems, totalAmount, totalDiscount, totalTypeDiscount });

    }

    removeItem(index) {
        const cartData = JSON.parse(JSON.stringify(this.state.cartData));
        toastr.success('Success', cartData[index].name + " deleted successfully.");
        cartData.splice(index, 1);

        localStorage.setItem('cartData', JSON.stringify(cartData))
        this.setState({ cartData });
        this.countItemPrice(cartData);
    }

    reloadData = () => {
        const cartData = JSON.parse(localStorage.getItem('cartData'));
        if (cartData && cartData.length !== 0) {
            this.setState({ cartData, loading: false })
            this.countItemPrice(cartData);
        } else {
            this.setState(prevState => {
                localStorage.setItem('cartData', JSON.stringify(prevState.itemData))
                this.countItemPrice(prevState.itemData);
                return {
                    cartData: prevState.itemData,
                    loading: false
                }
            })
        }
    }

    changeQty(index, event) {
        const cartData = JSON.parse(JSON.stringify(this.state.cartData));
        if (event === '+') {
            cartData[index].qty = cartData[index].qty + 1;
        } else if (event === '-') {
            if (cartData[index].qty === 1) {
                toastr.success('Success', cartData[index].name + " deleted successfully.");
                cartData.splice(index, 1);

                localStorage.setItem('cartData', JSON.stringify(cartData))
                this.setState({ cartData })
            } else {
                cartData[index].qty = cartData[index].qty - 1;
            }
        }
        this.setState(prevState => {
            localStorage.setItem('cartData', JSON.stringify(cartData))
            return {
                cartData
            }
        })
        this.countItemPrice(cartData);
    }

    render() {
        return (
            <div>
                <Header />
                {this.state.loading ?
                    <LoaderComponent /> :
                    <div className={styles.BodyWrapper}>
                        <div className={styles.CartWrapper}>
                            <div className={styles.PriceBoardWrapper}>
                                <div className={styles.PriceBoardBox}>
                                    <div className={styles.TotalText}>Total</div>
                                    <div className={styles.ItemWrapper}>
                                        <span className={styles.BillItem}>Items ({this.state.totalItems})</span>
                                        <span className={styles.BillPrice}>: $ {this.state.totalAmount}</span>
                                    </div>
                                    <div className={styles.DiscountWrapper}>
                                        <div>
                                            <span className={styles.BillItem}>Discount</span>
                                            <span className={styles.BillPrice}>: - $ {this.state.totalDiscount}</span>
                                        </div>
                                        <div>
                                            <span className={styles.BillItem}>Type Discount</span>
                                            <span className={styles.BillPrice}>: - $ {this.state.totalTypeDiscount}</span>
                                        </div>
                                    </div>

                                </div>
                                <div className={styles.OrderTotalWrapper}>
                                    <div className={styles.OrderTotal}>
                                        <span className={styles.OrderTotalText}>Order Total</span>
                                        <span className={styles.OrderTotalPrice}>$ {this.state.totalAmount - (this.state.totalDiscount + this.state.totalTypeDiscount)}</span>
                                    </div>
                                </div>
                                {this.state.cartData.length === 0 ?
                                    <div className={styles.ReloadButtonWrapper}>
                                        <button className={styles.ReloadButton} onClick={this.reloadData}>
                                            <span className={styles.ReloadButtonText}>Reload Data</span>
                                        </button>
                                    </div> : null}
                            </div>
                            {this.state.cartData.length === 0 ? <div className={styles.DummyHeight}></div> : null}
                            <div className={styles.OrderList}>
                                <div className={styles.TitleBarWrapper}>
                                    <div className={styles.Bar}></div>
                                    <div className={styles.TitleContainer}>
                                        <span className={styles.ItemsHeader}>Items ({this.state.totalItems})</span>
                                        <span className={styles.QtyHeader}>Qty</span>
                                        <span className={styles.PriceHeader}>Price</span>
                                    </div>
                                    {/* <div className={styles.Bar}></div> */}
                                </div>
                                {this.state.cartData.map((item, index) => {
                                    return (
                                        <div className={styles.ItemList} key={index + item.name}>
                                            <div className={styles.EachItem}>
                                                <div className={styles.EachItemBox}>
                                                    <span className={styles.ItemImgWrapper}>
                                                        <img src={item.img_url} className={styles.ItemImage} alt='ItemImage' />
                                                    </span>
                                                    <span className={styles.ItemName}>{item.name}</span>
                                                    <span className={styles.CloseButton} onClick={() => this.removeItem(index)}>
                                                        <i className={["fa", "fa-times"].join(' ')} aria-hidden="true"></i>
                                                    </span>
                                                </div>
                                                <div className={styles.QuantityBoxWrapper}>
                                                    <span className={styles.MinusSymbol} onClick={() => this.changeQty(index, '-')}>
                                                        <i className={["fa", "fa-minus"].join(' ')} aria-hidden="true"></i>
                                                    </span>
                                                    <span className={styles.QuantityBox}>
                                                        <span className={styles.QuantityText}>{item.qty}</span>
                                                    </span>
                                                    <span className={styles.PlusSymbol} onClick={() => this.changeQty(index, '+')}>
                                                        <i className={["fa", "fa-plus"].join(' ')} aria-hidden="true"></i>
                                                    </span>
                                                </div>
                                                <div className={styles.PriceWrapper}>
                                                    <span className={styles.EachItemPrice}>$ {item.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>

                        </div>
                    </div>}
                <Footer />
            </div>)
    }
};

export default Cart;