"use client"
import { useEffect, useState } from "react"
import { useAtom } from "jotai"
import { shoppingCart, ShoppingCartType } from "@/lib/atoms"
import ShoppingCartCard from "./ShoppingCartCard"
import { Loader } from "lucide-react"
import { ScrollArea } from "../ui/scroll-area"

function loadCartFromLocalStorage() {
  try {
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
  }
  return null;
}

function saveCartToLocalStorage(cart: ShoppingCartType[]) {
  try {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
}

export default function ShoppingCart() {
  const [cart, setCart] = useAtom(shoppingCart)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedCart = loadCartFromLocalStorage()
    if (savedCart) {
      setCart(savedCart);
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    saveCartToLocalStorage(cart)
  }, [cart])

  return (
    <div className="h-screen bg-secondary min-w-[400px]">
      <h1 className={`p-4`}> Your Order </h1>
      {
        loading ? 
        <div className="flex flex-col justify-center items-center">
          <Loader size={30} className="animate-spin" />
        </div>
        :
        <ScrollArea className="h-40">
          {
            cart.map((item, index) => {
              return (
                <ShoppingCartCard item={item} key={index}/>
              )
            })
          }
        </ScrollArea>
      }
    </div>
  )
}
