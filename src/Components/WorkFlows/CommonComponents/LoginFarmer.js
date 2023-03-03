import * as React from 'react';
import Typography from '@mui/material/Typography';

export default function LoginFarmer() {
  return (
    <form>
      <Typography variant="h6" gutterBottom>
        Farmer Login
      </Typography>
      <section className="p-4  pb-4">
        <div className='farmerLoginContent'>
          <div className="form-group row col-md-12 p-2">
              <label for="farmerID" className="col-md-3 col-form-label text-end">Farmer ID</label>
              <div className="col-md-8">
                  <input type="text" className="form-control" id="farmerID" name="farmerID" />
              </div>
          </div>
        </div>
      </section>
    </form>
  );
}