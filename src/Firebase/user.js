import { firestore, storage } from "./firebase";
import firebase from "firebase";

export const createUserDocument = async (user) => {
  const docRef = firestore.collection("users").doc(user.uid);

  const userProfile = {
    uid: user.uid,
    email: user.email,
    ip: "",
  };

  try {
    await docRef.set(userProfile);
    return { success: true, message: "User document created successfully." };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getUserDocument = async (userId) => {
  try {
    const docRef = firestore.collection("users").doc(userId);
    const userDoc = await docRef.get();

    if (userDoc.exists) {
      return userDoc.data();
    } else {
      throw new Error("User document not found.");
    }
  } catch (error) {
    throw error;
  }
};

export const updateUserDocument = async (userId, updates) => {
  try {
    const docRef = firestore.collection("users").doc(userId);
    await docRef.update(updates);
  } catch (error) {
    throw error;
  }
};

export const createAdminactivitiesDocument = async (activities) => {
  const docRef = firestore.collection("activities").doc();

  const addactivities = {
    bookingUid: docRef.id,
    name: activities.name,
    description: activities.description,
    image: activities.image,
    slots: activities.slots,
    createdAt: new Date(),
  };

  try {
    await docRef.set(addactivities);
    return {
      success: true,
      message: "Activities document created successfully.",
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const uploadImage = async (imageFile) => {
  const storageRef = storage.ref();
  const imageRef = storageRef.child(imageFile.name);
  await imageRef.put(imageFile);
  const imageURL = await imageRef.getDownloadURL();
  return imageURL;
};

export const getAdminactivitiesDocument = async () => {
  try {
    const snapshot = await firestore.collection("activities").get();
    const activities = snapshot.docs.map((doc) => {
      const data = doc.data();
      const slots = data.slots || [];
      return {
        uid: doc.id,
        name: data.name,
        description: data.description,
        image: data.image,
        slots: slots,
      };
    });
    return {
      success: true,
      activities: activities,
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const createTrainersCollection = async (trainers) => {
  const docRef = firestore.collection("trainers").doc();

  const trainerdata = {
    trainerUid: docRef.id,
    image: trainers.image,
    name: trainers.name,
    certification: trainers.certified,
    email: trainers.email,
    phone: trainers.phone,
    createdAt: new Date(),
  };
  try {
    await docRef.set(trainerdata);
    return {
      success: true,
      message: "Trainers document created successfully.",
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const uploadImageTrainer = async (imageFile) => {
  const storageRef = storage.ref();
  const imageRef = storageRef.child(imageFile.name);
  await imageRef.put(imageFile);
  const imageURL = await imageRef.getDownloadURL();
  return imageURL;
};

export const createKidsslotDocument = async (kidsslots, userId) => {
  const docRef = firestore.collection("kidsslots").doc();

  const addkidsslots = {
    userId: userId,
    bookingkidsUid: docRef.id,
    name: kidsslots.name,
    description: kidsslots.description,
    image: kidsslots.image,
    slots: kidsslots.slots,
    createdAt: new Date(),
  };

  try {
    await docRef.set(addkidsslots);
    return {
      success: true,
      message: "Kids slots document created successfully.",
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const uploadkidsImage = async (imageFile) => {
  const storageRef = storage.ref();
  const imageRef = storageRef.child(imageFile.name);
  await imageRef.put(imageFile);
  const imageURL = await imageRef.getDownloadURL();
  return imageURL;
};

export const createProductsDocument = async (products) => {
  const docRef = firestore.collection("products").doc();

  const addproducts = {
    productsUid: docRef.id,
    name: products.name,
    description: products.description,
    image: products.image,
    quantity: products.quantity,
    amount: products.amount,
    createdAt: new Date(),
  };

  try {
    await docRef.set(addproducts);
    return {
      success: true,
      message: "Products  document created successfully.",
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const uploadproductsImage = async (imageFile) => {
  const storageRef = storage.ref();
  const imageRef = storageRef.child(imageFile.name);
  await imageRef.put(imageFile);
  const imageURL = await imageRef.getDownloadURL();
  return imageURL;
};

// export const getProductsDocument = async () => {
//   try {
//     const snapshot = await firestore.collection("products").get();
//     const productsData = snapshot.docs.map((doc) => doc.data());
//     return productsData;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     throw error;
//   }
// };

// export const bookActivity = async (userId, activityId, selectedSlot) => {
//   try {
//     const bookingRef = firestore.collection("bookings");
//     const newBooking = {
//       userId: userId,
//       activityId: activityId,
//       bookedSlot: new Date(selectedSlot),
//       createdAt: new Date(),
//     };
//     await bookingRef.add(newBooking);
//     console.log("Activity booked successfully!");
//   } catch (error) {
//     throw error;
//   }
// };

export const bookActivity = async (userId, activityId, selectedSlot) => {
  try {
    const bookingRef = firestore.collection("bookings");
    const newBooking = {
      userId: userId,
      activityId: activityId,
      bookedSlot: firebase.firestore.Timestamp.fromDate(new Date(selectedSlot)),
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    };
    await bookingRef.add(newBooking);
    console.log("Activity booked successfully!");
  } catch (error) {
    throw error;
  }
};

export const bookKidsslots = async (
  userId,
  bookedSlot,
  name,
  bookingkidsUid
) => {
  try {
    const bookingRef = firestore.collection("kidsslotbookings");
    const newBooking = {
      userId: userId,
      bookedSlot: bookedSlot,
      name: name,
      bookingkidsUid: bookingkidsUid,
      createdAt: new Date(),
    };
    const docRef = await bookingRef.add(newBooking);
    console.log("Slot booked successfully with ID:", docRef.id);
  } catch (error) {
    throw error;
  }
};

export const createMembershipDocument = async (
  userId,
  membershipType,
  name,
  amount,
  email
) => {
  const docRef = firestore.collection("memberships").doc();

  const membershipData = {
    userId: userId,
    type: membershipType,
    name: name,
    amount: amount,
    email: email,
    createdAt: new Date(),
  };

  try {
    await docRef.set(membershipData);
    return {
      success: true,
      message: "Membership document created successfully.",
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getMembershipPlans = async (userId) => {
  try {
    const membershipRef = firestore.collection("memberships");
    const snapshot = await membershipRef.where("userId", "==", userId).get();

    const membershipPlans = snapshot.docs.map((doc) => {
      const data = doc.data();
      const createdDate = data.createdAt.toDate();
      const expiryDate = calculateExpiryDate(createdDate, data.type);
      return {
        id: doc.id, // Document ID
        email: data.email,
        membershipType: data.type,
        description: data.description,
        name: data.name,
        amount: parseFloat(data.amount),
        createdDate: createdDate,
        expiryDate: expiryDate, // Convert the amount to a number
      };
    });

    return membershipPlans;
  } catch (error) {
    throw error;
  }
};
const calculateExpiryDate = (createdDate, membershipType) => {
  if (membershipType === "Daily Pass") {
    return createdDate.getTime() + 24 * 60 * 60 * 1000; // One day expiry
  } else if (membershipType === "Monthly Pass") {
    const expiryDate = new Date(createdDate);
    expiryDate.setMonth(expiryDate.getMonth() + 1); // One month expiry
    return expiryDate.getTime();
  } else {
    return null; // Return null for other membership types (customize as needed)
  }
};
