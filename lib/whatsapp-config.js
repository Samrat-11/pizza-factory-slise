// whatsapp-config.js

const WH_API_VERSION = 'v20.0';
const WH_API_BASE = 'https://graph.facebook.com';

// Replace with your Meta WhatsApp Business API values
const WH_PHONE_NUMBER_ID = "716301431576675";
const WH_ACCESS_TOKEN = "EAAPKEBmoa4kBPVQDHZBaXSHQrgfPARPOWimuDqMHRhEnB7HDFIMBNuRcIb7obhcZCVcZAbZCeldUcrFrZCXV4lfYAIrqxcO23xEgDwdIn8f9SyZAuy5wEW0Dlgz63rlxMZCc5zZATkq6h2TyZB46gT6gI6N34w71HIUXVKk2ZCmdGNZAwYWqhxItvvZBmH0Iu9gX02jMrAZDZD";

const CHEF_PHONE = "918500112155";
const MANAGER_PHONE = "919505564388";

// Replace with your valid Meta-approved template names
const TEMPLATE_CUSTOMER = "customer_receipt";         // Example: Approved template for customer
const TEMPLATE_KITCHEN  = "new_order_notification";  // Example: Approved template for kitchen & manager

async function sendWhatsAppMessage(toPhone, templateName, bodyTexts = []) {
  const url = `${WH_API_BASE}/${WH_API_VERSION}/${WH_PHONE_NUMBER_ID}/messages`;

  const components = [{
    type: "body",
    parameters: bodyTexts.map(text => ({ type: "text", text: String(text) }))
  }];

  const payload = {
    messaging_product: "whatsapp",
    to: toPhone,
    type: "template",
    template: {
      name: templateName,
      language: { code: "en" },
      components
    }
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${WH_ACCESS_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  console.log("WhatsApp API Response:", data);
  return data;
}
