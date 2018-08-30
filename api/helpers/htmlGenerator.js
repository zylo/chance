const htmlHeader = ' <h1> Charges </h1> ';
const totalFooter = total => ` <h3> Total: $${total} </h1> `;

// todo: format date
// todo: format type
// todo: format amount

/**
 * Takes in a charge and returns the template filled with charge data
 *
 * @param { Charge } charge
 */
const fillTemplate = (charge) => {
  const {
    id, name, amount, date, description, type
  } = charge;
  const chargeHtml = `
    <div style="border:1px solid #000;">
      <h2> Name: ${name} </h2>
      <p> <strong> ID: </strong> ${id} </p>
      <p> <strong> Charge Date:</strong> ${date} </p>
      <p> <strong> Amount:</strong> ${amount} </p>
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
    // todo: Get rid of commas
    // TODO: join or dont return
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
