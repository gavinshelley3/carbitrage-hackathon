import Image from "next/image";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";


const AlgoTables = ({carData}) => {
  return (
    <>
    <Card>
      <CardBody>
        <CardTitle tag="h5">Available Vehicles</CardTitle>
        <div className="table-responsive">
          <Table className="text-nowrap mt-3 align-middle" borderless>
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Location</th>

                <th>Mileage</th>
                <th>Price</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {carData && carData.map((cdata, index) => (
                <>
                {cdata?.make && 
                  <tr key={index} className="border-top">
                    <td>
                      <div className="d-flex align-items-center p-2">
                        <Image
                          src={cdata?.photo?.[0] ? cdata.photo[0].id : 'https://www.iconpacks.net/icons/2/free-car-icon-2901-thumb.png'}
                          className="rounded-circle"
                          alt="car_photo"
                          width="45"
                          height="45"
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; 
                            currentTarget.src="https://www.iconpacks.net/icons/2/free-car-icon-2901-thumb.png";
                          }}
                        />
                        <div className="ms-3">
                          <h6 className="mb-0">{cdata.make} {cdata.model}</h6>
                          <span className="text-muted">{cdata.makeYear}</span>
                        </div>
                      </div>
                    </td>
                    <td>{cdata.city}, {cdata.state}</td>
                    <td>{cdata.mileage}</td>
                    <td>{cdata.price}</td>
                    <td>
                      {cdata.score}
                    </td>
                    
                  </tr>
              } </>
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
    
    </>
  );
};

export default AlgoTables;
