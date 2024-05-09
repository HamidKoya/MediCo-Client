import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useSelector } from "react-redux";
function Wallet() {
    const {currentUser} = useSelector((state)=>state.user)
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
            <p className="flex justify-center mt-4 font-medium text-green-400">Balance : ₹ {currentUser.userData.wallet}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Wallet;
