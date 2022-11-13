import Image from "next/image";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

const getValueDiff = (price) => {
  var value = 0 
  if (price <= 3999){
    value = Math.floor(Math.random() * 6000);
  } else if (price > 3999 && price <= 9999){
    value = Math.floor(Math.random() * (15000 - 3999)) + 3999;
  } else if (price > 9999 && price <= 19999){
    value = Math.floor(Math.random() * (30000 - 9999)) + 9999;
  } else if (price > 19999 && price <= 29999){
    value = Math.floor(Math.random() * (45000 - 19999)) + 19999;
  } else {
    value = Math.floor(Math.random() * (65000 - 29999)) + 29999;
  }
  var difference = Math.abs(price - value);
  console.log(value)
  var color = "text-secondary"
  var sign = "$"
  if (price > value){
    color = "text-danger"
    sign = "+ $"
  } else if (price < value){
    color = "text-success"
    sign = "- $"
  }
  return (
    <>
      <p className={color}>{`${sign}${difference}`}</p>
    </>
  )
}

const ProjectTables = ({carData}) => {
  return (
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
                      {getValueDiff(cdata.price)}
                    </td>
                    
                  </tr>
              } </>
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProjectTables;
