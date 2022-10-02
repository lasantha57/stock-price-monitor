import React, { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { Container } from '@mui/system';

import { Price, PriceSource, Ticker } from '../../common/types';
import { PriceTable } from '../../components/PriceTable';
import { getSources, getTickers } from '../../services/api';

const SOCKET_URL = process.env.REACT_APP_SOCKET || '';

const PriceMonitor: React.FC = () => {

  const [selectedSourceId, setselectedSourceId] = useState(-1);
  const [selectedTickerId, setselectedTickerId] = useState(-1);

  const [sources, setSources] = useState<PriceSource[]>([]);
  const [tickers, setTickers] = useState<Ticker[]>([]);
  const [prices, setPrices] = useState<Price[]>([]);

  const fetchTickers = async () => {
    try {
      const tickers = await getTickers();
      setTickers(tickers);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchSources = async () => {
    try {
      const sources = await getSources();
      setSources(sources);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchSources();
    fetchTickers();
  }, []);

  useEffect(() => {
    const ws = new WebSocket(SOCKET_URL);
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: 'read',
          path: 'prices'
        })
      );
    };

    ws.onmessage = (msg) => {
      const message = JSON.parse(msg.data);
      setPrices(message.data);
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleSourceChange = (event: SelectChangeEvent<typeof selectedSourceId>) => {
    const value = event.target.value;
    setselectedSourceId(value as typeof selectedSourceId);
  };

  const handleTickerChange = (event: SelectChangeEvent<typeof selectedTickerId>) => {
    const value = event.target.value;
    setselectedTickerId(value as typeof selectedTickerId);
  };

  return (
    <Container maxWidth={false}>
      <Box my={5}>
        <Box my={2}>
          <FormControl sx={{ width: '30%' }}>
            <InputLabel>Price Source *</InputLabel>
            <Select
              required
              name="source"
              placeholder="Source"
              value={selectedSourceId}
              onChange={handleSourceChange}
              input={<OutlinedInput label="Price Source" />}>
              <MenuItem value="-1" sx={{ display: 'none' }}>
                Please select Price Source
              </MenuItem>
              {
                sources.map((source) => (
                  <MenuItem key={source.id} value={source.id}>
                    {source.name}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Box>
        <Box my={2}>
          <FormControl sx={{ width: '30%' }}>
            <InputLabel>Ticker *</InputLabel>
            <Select
              required
              name="ticker"
              placeholder="Ticker"
              value={selectedTickerId}
              onChange={handleTickerChange}
              input={<OutlinedInput label="Ticker" />}>
              <MenuItem value="-1" sx={{ display: 'none' }}>
                Please select Ticker
              </MenuItem>
              {
                tickers.map((ticker) => (
                  <MenuItem key={ticker.id} value={ticker.id}>
                    {ticker.name}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Box>
        <Box my={3}>
          <PriceTable
            prices={prices}
            sourceId={selectedSourceId}
            tickerId={selectedTickerId}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default PriceMonitor;