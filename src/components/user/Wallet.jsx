import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import axios from "axios";
function Wallet() {
    const {currentUser} = useSelector((state)=>state.user)
    const [wallet,setWallet] = useState()
    const userId = currentUser.userData._id
    useEffect(()=>{
        axios.post("https://medico-server-b7s5.onrender.com/wallet",{userId}).then((res)=>{
            setWallet(res.data)
        }).catch((error)=>{
            console.log(error.message);
        })
    },[userId,wallet])
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Wallet</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="w-80 h-28">
            <p className="text-lg font-semibold">Wallet</p>
            <div className="flex justify-center">
              <img className="w-10 h-10" src="/wallet.png" alt="wallet" />
            </div>
            <p className="flex justify-center mt-4 font-medium text-green-400">Balance : ₹ {wallet}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Wallet;
