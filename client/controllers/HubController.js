// Create a new hub (Mother/Normal/Branch)
import Hub from "../models/HubSchema.js"; 
export const createHubController = async (req, res) => {
  try {
    const { hubName, hubType, address, parentHubId } = req.body;

    // Basic validation
    if (!hubName) return res.status(400).json({ success: false, message: "Hub Name is required" });
    if (!hubType || !["mother", "normal", "branch"].includes(hubType))
      return res.status(400).json({ success: false, message: "Hub Type must be mother, normal, or branch" });
    if (!address) return res.status(400).json({ success: false, message: "Address is required" });

    const newHub = new Hub({
      hubName,
      hubType,
      address,
      parentHubId: parentHubId || null, // null for mother hub
    });

    const savedHub = await newHub.save();
    res.status(201).json({ success: true, message: "Hub created successfully", hub: savedHub });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating hub", error: error.message });
  }
};

// Get all hubs hierarchically (recursive)
async function getChildren(parentId) {
  const children = await Hub.find({ parentHubId: parentId });
  const results = [];
  for (const child of children) {
    const subChildren = await getChildren(child._id);
    results.push({
      _id: child._id,
      hubName: child.hubName,
      hubType: child.hubType,
      address: child.address,
      children: subChildren,
    });
  }
  return results;
}

export const getAllHubsController = async (req, res) => {
  try {
    const motherHubs = await Hub.find({ hubType: "mother" });
    const results = [];
    for (const mother of motherHubs) {
      const children = await getChildren(mother._id);
      results.push({
        _id: mother._id,
        hubName: mother.hubName,
        hubType: mother.hubType,
        address: mother.address,
        children,
      });
    }
    res.json({ success: true, hubs: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching hubs", error: error.message });
  }
};

// Get single hub by id with children recursively
export const getSingleHubController = async (req, res) => {
  try {
    const { id } = req.params;
    const hub = await Hub.findById(id);
    if (!hub) return res.status(404).json({ success: false, message: "Hub not found" });

    const children = await getChildren(hub._id);
    res.json({
      success: true,
      hub: {
        _id: hub._id,
        hubName: hub.hubName,
        hubType: hub.hubType,
        address: hub.address,
        children,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching hub", error: error.message });
  }
};

// Update hub details
export const updateHubController = async (req, res) => {
  try {
    const { id } = req.params;
    const { hubName, hubType, address, parentHubId } = req.body;

    if (hubType && !["mother", "normal", "branch"].includes(hubType)) {
      return res.status(400).json({ success: false, message: "Invalid hubType value" });
    }

    const updatedHub = await Hub.findByIdAndUpdate(
      id,
      {
        hubName,
        hubType,
        address,
        parentHubId: parentHubId || null,
      },
      { new: true }
    );
    if (!updatedHub) return res.status(404).json({ success: false, message: "Hub not found" });

    res.json({ success: true, message: "Hub updated successfully", hub: updatedHub });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating hub", error: error.message });
  }
};

// Delete hub by Id
export const deleteHubController = async (req, res) => {
  try {
    const { id } = req.params;

    // Optional: You may want to delete child hubs recursively or restrict delete if children exist
    // For now, just delete this hub

    const deletedHub = await Hub.findByIdAndDelete(id);
    if (!deletedHub) return res.status(404).json({ success: false, message: "Hub not found" });

    res.json({ success: true, message: "Hub deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error deleting hub", error: error.message });
  }
};
