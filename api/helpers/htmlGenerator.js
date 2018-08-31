// Header for HTML output
const htmlHeader = ' <h1> Charges </h1> ';

// Footer for HTML output including charge totals
const totalFooter = total => ` <h3> Total: $${total} </h1> `;

const moment = require('moment');

/**
 * Formats the date into a better readable format
 * @param {Date} date
 */
const formatDate = date => moment(date).format('MMM DD h:mm A');

/**
 * Formats the number into currency
 * @param {number} amount
 */
const formatAmount = amount => `$${amount.toFixed(2)}`;

/**
 * Takes in a charge and returns the template filled with charge data
 *
 * @param { Charge } charge
 */
const fillTemplate = (charge) => {
  const {
    id, name, amount, date, description, type
  } = charge;
  const formattedDate = formatDate(date);
  const formattedAmount = formatAmount(amount);
  const chargeHtml = `
    <div style="border:1px solid #000;">
      <h2> Name: ${name} </h2>
      <p> <strong> ID: </strong> ${id} </p>
      <p> <strong> Charge Date:</strong> ${formattedDate} </p>
      <p> <strong> Amount:</strong> ${formattedAmount} </p>
      <p> <strong> Description:</strong> ${description} </p>
      <p> <strong> Type:</strong> ${type} </p> 
    </div> <br />`;
  return {
    chargeHtml: chargeHtml,
    amount: amount
  };
};

/**
 * Returns a basic HTML body including the header and a list of charges
 *
 * @param {Array <Charge> | Charge} charges
 */
const generateHTML = (charges) => {
  let html = htmlHeader;
  let total = 0;
  if (!(Array.isArray(charges))) {
    const { chargeHtml, amount } = fillTemplate(charges);
    html += chargeHtml;
    total += amount;
  } else {
    html += charges.map((charge) => {
      const { chargeHtml, amount } = fillTemplate(charge);
      total += amount;
      return chargeHtml;
    }).join('');
  }
  html += totalFooter(total);
  return html;
};

module.exports = {
  generateHTML: generateHTML
};
