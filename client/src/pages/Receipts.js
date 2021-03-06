import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  CardContent
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ReceiptsModal from "../components/ReceiptsModal";
import MonthSelect from "../components/MonthSelect";
import YearSelect from "../components/YearSelect";
import { formatDate } from "../utils/dateFunctions";
const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0, 40)
  },
  textCenter: {
    textAlign: "center"
  },
  toolbar: theme.mixins.toolbar
});

const Receipts = props => {
  const { classes } = props;
  const [receiptData, setReceiptData] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const years = ["All", "2020", "2019", "2018"];
  const authHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  };

  useEffect(() => {
    const fetchReceipts = async () => {
      const response = await fetch(`/receipts/`, authHeader);
      const jsonResponse = await response.json();

      await setReceiptData(jsonResponse);
    };

    fetchReceipts();
  }, []);

  const handleOpen = receipt => {
    setModalData(receipt);
    setOpen(true);
  };
  const handleClose = () => {
    setModalData({});
    setOpen(false);
  };
  const handleMonthChange = async month => {
    setMonth(month.toString());
    const response = await fetch(`/receipts/${year}/${month}`, authHeader);
    const jsonResponse = await response.json();

    await setReceiptData(jsonResponse);
  };
  const handleYearChange = async year => {
    if (year === "All") {
      setYear("");
      setMonth("");
      const response = await fetch(`/receipts/`, authHeader);
      const jsonResponse = await response.json();
      await setReceiptData(jsonResponse);
    } else {
      setYear(year);
      const response = await fetch(`/receipts/${year}`, authHeader);
      const jsonResponse = await response.json();
      await setReceiptData(jsonResponse);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container alignItems='center'>
        <Grid item sm>
          <Typography variant='h4'>Receipts</Typography>
        </Grid>
        <Grid item>
          <YearSelect
            selectedOption={year}
            optionsArray={years}
            handleOptionChange={handleYearChange}
          />
        </Grid>
        <Grid item>
          <MonthSelect
            selectedOption={month}
            optionsArray={months}
            handleOptionChange={handleMonthChange}
            isDisabled={year ? false : true}
          />
        </Grid>
      </Grid>
      <ReceiptsModal handleClose={handleClose} open={open} data={modalData} />
      <Grid container direction='row' spacing={3}>
        {receiptData.posts &&
          receiptData.posts.map(receipt => (
            <Grid item md={3} key={receipt.id}>
              <Card elevation={0} style={{ backgroundColor: "transparent" }}>
                <CardActionArea>
                  <CardMedia
                    image={receipt.images[0].location}
                    style={{ height: "200px" }}
                    onClick={() => handleOpen(receipt)}
                  ></CardMedia>
                  <CardContent className={classes.textCenter}>
                    <Typography>{formatDate(receipt.receipt_date)}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default withStyles(useStyles)(Receipts);
