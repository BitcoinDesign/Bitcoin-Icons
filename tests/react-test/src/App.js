import './App.css';
import icons from './icons.json';
import IconComponent from './Icon';

function App() {
  let iconsData = [];

  const iconKeys = Object.keys(icons);

  iconKeys.forEach((key, index) => {
    iconsData.push( icons[key] );
    iconsData[index].slug = key;
  })

  return (
    <div className="App">
      <h1>React Icons Test</h1>
      <h2>Filled Icons</h2>
      <ul className={'icons'}>
          {iconsData.map( (value, index) => (
              <li key={index}>
                  <IconComponent tag={value.id + 'Icon'} version={'filled'} style={{width: '100px', height: '100px', color: '#ff9500'}} />
                  <p>{value.name}</p>
                  <code>{value.id + 'Icon'}</code>
              </li>
          ))}
      </ul>

      <h2>Outline Icons</h2>
      <ul className={'icons'}>
        {iconsData.map( (value, index) => (
            <li key={index}>
              <IconComponent tag={value.id + 'Icon'} version={'outline'} style={{width: '100px', height: '100px', color: '#ff9500'}} />
              <p>{value.name}</p>
              <code>{value.id + 'Icon'}</code>
            </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
