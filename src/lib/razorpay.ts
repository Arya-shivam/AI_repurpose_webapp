declare global {
  interface Window {
    Razorpay: any;
  }
}

export const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const initializePayment = async (amount: number, email: string, onSuccess: () => void) => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: amount * 100, // Amount in paise
    currency: "INR",
    name: "ContentWizard",
    description: "Content Transformation Subscription",
    handler: function (response: any) {
      onSuccess();
    },
    prefill: {
      email: email
    },
    theme: {
      color: "#4F46E5"
    }
  };

  const razorpayInstance = new window.Razorpay(options);
  razorpayInstance.open();
};