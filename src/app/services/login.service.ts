import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

declare global {
    interface Window {
        ethereum: any;
    }
}

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private apiUrl = 'http://localhost:3000';
    provider!: ethers.BrowserProvider;

    constructor() {
        if (typeof window.ethereum !== 'undefined') {
            this.provider = new ethers.BrowserProvider(window.ethereum);
        } else {
            alert('MetaMask not found. Please install it.');
        }
    }

    async connectWallet(): Promise<string | null> {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            return accounts[0];
        } catch (error) {
            console.error('Wallet connection error:', error);
            return null;
        }
    }
}
