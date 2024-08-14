'use client'
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Modal, Typography, Stack, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, InputAdornment } from '@mui/material';
import { Search, Close } from '@mui/icons-material';
import { query, collection, getDocs, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      updateInventory();
    }
  }, []);

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data()      
      });      
    });
    setInventory(inventoryList);
    setFilteredInventory(inventoryList);
  };

  const addItem = async (itemName, quantityToAdd = 1) => {
    const docRef = doc(collection(firestore, 'inventory'), itemName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + quantityToAdd }, { merge: true });
    } else {
      await setDoc(docRef, { quantity: quantityToAdd });
    }

    await updateInventory();
  };

  const handleAddNewItem = async () => {
    if (itemName.trim() === '') return;
    await addItem(itemName, itemQuantity);
    handleClose();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 }, { merge: true });
      }
    }

    await updateInventory();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setItemName('');
    setItemQuantity(1);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const filtered = inventory.filter(item => item.name.toLowerCase().includes(query));
      setFilteredInventory(filtered);
    } else {
      setFilteredInventory(inventory);
    }
  };

  const resetSearch = () => {
    setSearchQuery('');
    setFilteredInventory(inventory);
  };

  return (
    <Box sx={{ padding: '20px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F6F8', minHeight: '100vh' }}>
      <Typography variant='h4' sx={{ color: '#2C3E50', marginBottom: 4 }}>Inventory Management Dashboard</Typography>

      <TableContainer component={Paper} sx={{ width: '80%', height: '50vh', overflowY: 'auto', marginBottom: 4, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Table stickyHeader>
          <TableHead sx={{ backgroundColor: '#E7EBF0' }}>
            <TableRow>
              <TableCell sx={{ color: '#3E5060', fontWeight: 'bold' }}>Item Name</TableCell>
              <TableCell align="right" sx={{ color: '#3E5060', fontWeight: 'bold' }}>Quantity</TableCell>
              <TableCell align="right" sx={{ color: '#3E5060', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInventory.map((item) => (
              <TableRow key={item.name}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button 
                      variant="contained" 
                      sx={{ backgroundColor: '#007FFF', color: '#fff' }} 
                      onClick={() => addItem(item.name)}
                    >
                      Add
                    </Button>
                    <Button 
                      variant="contained" 
                      sx={{ backgroundColor: '#D32F2F', color: '#fff' }} 
                      onClick={() => removeItem(item.name)}
                    >
                      Remove
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" sx={{ width: '80%', justifyContent: 'space-between' }}>
        <Stack direction="row" alignItems="center" sx={{ gap: 1 }}>
          <TextField 
            placeholder="Search items..." 
            value={searchQuery}
            onChange={handleSearch}
            variant="outlined"
            size="small"
            sx={{ width: '300px', backgroundColor: '#fff' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <IconButton onClick={resetSearch} disabled={!searchQuery} sx={{ color: '#D32F2F' }}>
            <Close />
          </IconButton>
        </Stack>

        <Button variant="contained" sx={{ backgroundColor: '#007FFF', color: '#fff' }} onClick={handleOpen}>
          Add New Item
        </Button>
      </Stack>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 400, backgroundColor: 'white', padding: 4, borderRadius: 2, boxShadow: 24
        }}>
          <Typography variant='h6' marginBottom={2}>Add New Item</Typography>
          <TextField
            label="Item Name"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Quantity"
            type="number"
            fullWidth
            value={itemQuantity}
            onChange={(e) => setItemQuantity(Number(e.target.value))}
            margin="normal"
          />
          <Stack direction="row" spacing={2} marginTop={2} justifyContent="flex-end">
            <Button variant="contained" sx={{ backgroundColor: '#007FFF', color: '#fff' }} onClick={handleAddNewItem}>Add Item</Button>
            <Button variant="outlined" sx={{ color: '#D32F2F', borderColor: '#D32F2F' }} onClick={handleClose}>Cancel</Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}
