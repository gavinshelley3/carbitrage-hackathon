import Image from "next/image";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";

const tableData = [
  {
    avatar: user1,
    name: "Jonathan Gover",
    email: "hgover@gmail.com",
    project: "Flexy React",
    status: "pending",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user2,
    name: "Martin Gover",
    email: "hgover@gmail.com",
    project: "Lading pro React",
    status: "done",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user3,
    name: "Gulshan Gover",
    email: "hgover@gmail.com",
    project: "Elite React",
    status: "holt",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user4,
    name: "Pavar Gover",
    email: "hgover@gmail.com",
    project: "Flexy React",
    status: "pending",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user5,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Ample React",
    status: "done",
    weeks: "35",
    budget: "95K",
  },
];

const ProjectTables = ({carData}) => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Available Vehicles</CardTitle>
        {/* <CardSubtitle className="mb-2 text-muted" tag="h6">
          Overview of the projects
        </CardSubtitle> */}
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
                {cdata && 
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
                    {/* use this section to show comparative value */}
                    <td>
                      {cdata.price - 20000 > 0 ? (
                        <span className="p-2 bg-danger rounded-circle d-inline-block ms-3" />
                      ) : cdata.price - 20000 === 0 ? (
                        <span className="p-2 bg-warning rounded-circle d-inline-block ms-3" />
                      ) : (
                        <span className="p-2 bg-success rounded-circle d-inline-block ms-3" />
                      )}
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
