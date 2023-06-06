import { useState } from 'react'
import uuid from 'react-uuid';

interface Tab {
  data: string;
  km: number;
}

const Tab = [{ id: uuid(), data: '', km: 0 }]

export default function Table() {
  const [data, setData] = useState('');
  const [km, setKm] = useState(0);
  const [Uchet, setUchet] = useState(Tab);

  const setNewUchet = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUchet = {
      data: data,
      km: km,
      id: uuid()
    };
    const obj = Uchet.findIndex(n => n.data === newUchet.data);
    const handleState = Uchet.map((x, i) => {
      if (i === obj) {
        return { ...x, km: x.km + newUchet.km };
      }
      else { return x; }
    }
    )
    if (obj <= 0) { return setUchet((prevUchet) => { return [...prevUchet, newUchet] }); }
    else {
      setUchet(handleState);
    };

    setData('');
    setKm(0);
  }

  const tableRows = Uchet.sort((a, b) => a.data > b.data ? 1 : -1).map((e) => {
    return (
      <tr key={e.id}>
        <td>{e.data}</td>
        <td>{e.km}</td>
        <td><button onClick={() => {
          setUchet(
            Uchet.filter(a =>
              a.data !== e.data
            )
          );
        }}>
          x
        </button></td>
      </tr>
    );
  });

  return (
    <div>
      <form onSubmit={setNewUchet}>
        <label htmlFor="data">Дата (ДД.ММ.ГГ)</label>
        <input type="data" id='data' name='data' value={data} onChange={event => setData(event.target.value)} />
        <label htmlFor="km">Пройдено км</label>
        <input type="number" id='km' name='km' value={km} onChange={event => setKm(event.target.valueAsNumber)} />
        <button className='ok'>OK</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Дата (ДД.ММ.ГГ)</th>
            <th>Пройдено км</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  )
}
