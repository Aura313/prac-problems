import React, { useState } from 'react';

const mockData = {
  taxi: 'a car licensed to transport passengers in return for payment of a fare',
  food: {
    sushi:
      'a traditional Japanese dish of prepared rice accompanied by seafood and vegetables',
    apple: {
      Honeycrisp:
        'an apple cultivar developed at the MAES Horticultural Research Center',
      Fuji: 'an apple cultivar developed by growers at Tohoku Research Station',
    },
  },
};

const NestedObj = () => {
  const [nestedData, setNestedData] = useState(mockData);

  return (
    <div style={{ margin: "auto", width: "70%", paddingTop: 40 }}>
      <DisplayNested nestedObjected={nestedData} />
    </div>
  );
};

const DisplayNested = ({ nestedObjected }) => {
  return (
    <>
      {Object.entries(nestedObjected).map(([key, value]) => {
        if (typeof value === 'object') {
          return (
            <>
              <p>{`${key}: `}</p>
              <div style={{ paddingLeft: 50 }}>
                <DisplayNested nestedObjected={value} />
              </div>
            </>
          );
        } else {
          return <p>{`${key}: ${value}`}</p>;
        }
      })}
    </>
  );
};
export default NestedObj;
