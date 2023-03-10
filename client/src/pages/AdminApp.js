import React, { useEffect, useState, useMemo } from 'react';
import {
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';
import TableContainer from './TableContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SelectColumnFilter } from './filters';

const AdminApp = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    // const doFetch = async () => {
    //   const response = await fetch("http://localhost:5001/connect/getAllUsers", {method: "GET"});
    //   const body = await response.json();
    //   const contacts = body.results;
    //   console.log(body);
    //   setData(contacts);
    // };
    // doFetch();



    const fetchAllUsers = async () => {
      const raw = await fetch("http://localhost:5001/connect/getAllUsers", {method: "GET"})
      const data = await raw.json();
      setData(data);
      console.log(data);
      // localStorage.setItem('allUsers', JSON.stringify(data) );

  }
  fetchAllUsers();

  }, []);

  const renderRowSubComponent = (row) => {
    const {
     name,
      picture,
      nuid,
      email
    } = row.original;
    return (
      <Card style={{ width: '18rem', margin: '0 auto' }}>
        <CardImg top src={picture} alt='Card image cap' />
        <CardBody>
          <CardTitle>
            <strong>{name}</strong>
          </CardTitle>
          <CardText>
            <strong>NUID</strong>: {nuid} <br />
            <strong>Email:</strong>{' '}
            {email}
          </CardText>
        </CardBody>
      </Card>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: () => null,
        id: 'expander', // 'id' is required
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? '👇' : '👉'}
          </span>
        ),
      },
      // {
      //   Header: 'Title',
      //   accessor: 'name.title',
      //   disableSortBy: true,
      //   Filter: SelectColumnFilter,
      //   filter: 'equals',
      // },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'NUID',
        accessor: 'nuid',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },

      
    ],
    []
  );

  return (
    <Container style={{ marginTop: 100 }}>
      <TableContainer
        columns={columns}
        data={data}
        renderRowSubComponent={renderRowSubComponent}
      />
    </Container>
  );
};

export default AdminApp;
