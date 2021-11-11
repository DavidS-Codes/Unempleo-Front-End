import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  row: {
    flexDirection: "row",
    alignItems: "stretch",
    width: "100%",
  },
  tdColor: {
    padding: "10px",
    width: "14%",
    border: "1px solid #000000",
    backgroundColor: "#659D84",
  },
  td: {
    padding: "10px",
    width: "14%",
    border: "1px solid #000000",
  },
});

const TableRowsOfertas = ({ items }) => {
  const firstRow = (
    <View style={styles.row} key="0">
      <Text style={styles.tdColor}>ID</Text>
      <Text style={styles.tdColor}>OFERTA</Text>
      <Text style={styles.tdColor}>DESCRIPCIÓN DE OFERTA</Text>
      <Text style={styles.tdColor}>EMPRESA</Text>
      <Text style={styles.tdColor}>ÁREA</Text>
      <Text style={styles.tdColor}>PERSONA QUIEN APLICO</Text>
      <Text style={styles.tdColor}>FECHA DE APLICACIÓN</Text>
    </View>
  );
  const rows = items.map((offer) => (
    <View style={styles.row} key={offer.pkDetPersonaOferta}>
      <Text style={styles.td}>{offer.pkDetPersonaOferta}</Text>
      <Text style={styles.td}>{offer.oferta.nombreOferta}</Text>
      <Text style={styles.td}>{offer.oferta.descripcionOferta}</Text>
      <Text style={styles.td}>{offer.oferta.empresa.nombreEmpresa}</Text>
      <Text style={styles.td}>{offer.oferta.area.nombreArea}</Text>
      <Text style={styles.td}>
        {offer.persona.nombres + " " + offer.persona.apellidos}
      </Text>
      <Text style={styles.td}>{offer.fechaRegistro}</Text>
    </View>
  ));

  const rowsComplete = [firstRow].concat(rows);
  return <>{rowsComplete}</>;
};

const TableRowPersonas = ({ items }) => {
  const firstRow = (
    <View style={styles.row}>
      <Text style={styles.tdColor}>ID</Text>
      <Text style={styles.tdColor}>ROL</Text>
      <Text style={styles.tdColor}>CORREO</Text>
      <Text style={styles.tdColor}>FECHA DE REGISTRO</Text>
    </View>
  );
  const rows = items.map((user) => (
    <View style={styles.row} key={user.pkUsuario}>
      <Text style={styles.td}>{user.pkUsuario}</Text>
      <Text style={styles.td}>{user.roles.nombreRol}</Text>
      <Text style={styles.td}>{user.nombreUsuario}</Text>
      <Text style={styles.td}>{user.fechaRegistro}</Text>
    </View>
  ));

  const rowsComplete = [firstRow].concat(rows);
  return <>{rowsComplete}</>;
};

const ItemsTable = ({ data, typeReport }) => (
  <View style={styles.tableContainer}>
    {console.log(data.length)}
    {data.length === 0 ? (
      <Text>{"No se encontraron registros"}</Text>
    ) : typeReport === "ofertas" ? (
      <TableRowsOfertas items={data} />
    ) : (
      <TableRowPersonas items={data} />
    )}
  </View>
);

const MyDocument = ({ data, typeReport }) => (
  <Document
    title={
      typeReport === "ofertas"
        ? "Reporte ofertas aplicadas " + dateNow()
        : "Reporte usuarios registrados " + dateNow()
    }
  >
    <Page size="A1" style={styles.page} orientation="landscape" wrap={true}>
      <ItemsTable data={data} typeReport={typeReport} />
    </Page>
  </Document>
);

function dateNow() {
  return new Date().toISOString().slice(0, 10);
}

export default MyDocument;
