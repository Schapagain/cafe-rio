import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useSpring, a, config } from 'react-spring';
import CartSingleMeal from './CartSingleMeal';

export const Drawer = ({ cartOpen, toggleDrawer, order }) => {
    const orderMap = (order && order.meals) || new Map();
    const mealsInOrder = Array.from(orderMap.values());

    const drawerAnimation = useSpring({
        to: {
          right: cartOpen ? "0%" : "-100%"
        },
        from: {
          right: cartOpen ? "-100%" : "0%"
        },
        config: config.slow
      })
    
    const overlayAnimation = useSpring({
        to: {opacity: cartOpen ? 1 : 0},
        from: {opacity: cartOpen ? 0 : 1},
        config: config.slow
    })
    return (
        <a.div 
        className="fixed cursor-pointer overscroll-contain flex h-screen w-full top-0 right-0"
        style={drawerAnimation}>
            <a.div 
            style={overlayAnimation} 
            className="w-screen h-screen z-30 bg-gray-500 bg-opacity-60"
            onClick={() => toggleDrawer()}
            >
            </a.div>
            <div className="w-80 z-50 right-0 bg-green-400 h-full">
                {mealsInOrder.map(({meal,quantity}) => (
                    <CartSingleMeal 
                    key={meal.id}
                    meal={meal} 
                    quantity={quantity} 
                    handleRemove={()=>null}
                    handleAddOne={()=>null}
                    handleSubtractOne={()=>null}
                    />
                ))}
            </div>
        </a.div>
    )
}

Drawer.propTypes = {
    order: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    order: state.order.order,
})

export default connect(mapStateToProps, {})(Drawer)
