import { useState } from 'react'

interface Tab {
  data: Date;
  km: number;
}

const Tab = [{ data: '', km: '' }]

export default function Table() {
  const [data, setData] = useState('');
  const [km, setKm] = useState('');
  const [Uchet, setUchet] = useState(Tab);

  const setNewUchet = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUchet = {
      data: data,
      km: km,
    };

    const obj = Uchet.findIndex(n => n.data === newUchet.data);
    if (obj === -1) { return (Uchet.push({ ...newUchet })); }

    else {
      return obj.km += newUchet.km}

      console.log(Uchet);
      setUchet(PrevUchet => ({ ...PrevUchet, /*незнаю что указать тут*/ }))
      setUchet([]);
    };

    const tableRows = Uchet.sort((a, b) => Number(a.data) - Number(b.data)).map((e) => {
      return (
        <tr key={e.data}>
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
          <input type="number" id='km' name='km' value={km} onChange={event => setKm(event.target.value)} />
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
