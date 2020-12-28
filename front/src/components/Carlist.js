import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useTable } from "react-table";
import {
  Table as MaUTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Grid,
} from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { SERVER_URL } from "../constants.js";

import AddCar from "./AddCar";
import EditCar from "./EditCar";

function Table({ columns, data }) {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell {...column.getHeaderProps()}>
                {column.render("Header")}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </MaUTable>
  );
}

const Carlist = () => {
  const [data, setData] = useState({ cars: [] });

  const columns = [
    {
      Header: "Brand",
      accessor: "brand",
    },
    {
      Header: "Model",
      accessor: "model",
    },
    {
      Header: "Color",
      accessor: "color",
    },
    {
      Header: "Year",
      accessor: "year",
    },
    {
      Header: "Price R$",
      accessor: "price",
      Cell: ({ value }) =>
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value),
    },
    {
      id: "updatebutton",
      sortable: false,
      filterable: false,
      width: 100,
      accessor: "_links.self.href",
      Cell: ({ value, row }) => (
        <EditCar
          car={row}
          link={value}
          updateCar={updateCar}
          fetchCars={fetchCars}
        />
      ),
    },
    {
      id: "delbutton",
      sortable: false,
      filterable: false,
      width: 100,
      accessor: "_links.self.href",
      Cell: ({ value }) => (
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={() => {
            onDelClick(value);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  async function fetchCars() {
    try {
      const token = sessionStorage.getItem("jwt");
      const response = await fetch(`${SERVER_URL}api/cars`, {
        headers: { Authorization: token },
      });
      const { error, ...res } = await response.json();
      console.log(error, res);
      if (error) throw new Error(res.message);
      setData((d) => ({ ...d, cars: res._embedded.cars }));
    } catch (error) {
      console.error(error.message);
      toast.error("Error when fetching cars \n" + error.message, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  }

  function addCar(car) {
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + "api/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(car),
    })
      .then((res) => {
        return fetchCars();
      })
      .catch((err) => console.error(err));
  }

  function updateCar(car, link) {
    const token = sessionStorage.getItem("jwt");
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(car),
    })
      .then((res) => {
        toast.success("Changes saved", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        fetchCars();
      })
      .catch((err) =>
        toast.error("Error when saving", {
          position: toast.POSITION.BOTTOM_LEFT,
        })
      );
  }

  const onDelClick = (link) => {
    const token = sessionStorage.getItem("jwt");
    if (window.confirm("Are you sure to delete ?"))
      fetch(link, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      })
        .then((res) => {
          toast.success("Car deleted", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          fetchCars();
        })
        .catch((err) => {
          toast.error("Error when deleting", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          return console.error(err);
        });
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="App list">
      <Grid container spacing={3} alignItems="center">
        <Grid item>
          <AddCar addCar={addCar} fetchCars={fetchCars} />
        </Grid>
        <Grid item>
          <CSVLink data={data.cars} separator=";">
            Export CSV
          </CSVLink>
        </Grid>
      </Grid>

      <ToastContainer autoClose={1500} />
      <Table data={data.cars} columns={columns} />
    </div>
  );
};

export default Carlist;
