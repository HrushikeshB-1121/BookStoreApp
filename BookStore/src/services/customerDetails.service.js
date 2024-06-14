import CustomerDetails from '../models/customerDetails.model';

export const addCustomerDetails = async (_id,details) => {
  try {
    let data = await CustomerDetails.findOne({ customerId: _id });
    if (!data) {
        console.log(details);
        data = await CustomerDetails.create({
        customerId: _id,
        fullName: details.fullName,
        address: details.address,
        contact: details.contact
      });
    } else {
      throw new Error('details already present cannot be stored')
    }
    return data;
  } catch (error) {
    console.error('Error getting customer details:', error);
    throw error;
  }
};

export const getCustomerDetails = async (_id) => {
  try {
    let data = await CustomerDetails.findOne({ customerId: _id });
    if (!data) {
        throw new Error('details not found')
    }
    return data;
  } catch (error) {
    console.error('Error getting customer details:', error);
    throw error;
  }
};