import { useEffect, useRef, useState } from 'react';

import { Engine, EngineMessage } from '@/lib/engine';
import { cn } from '@/lib/utils';

import Cross from '@/components/svg/Cross';
import Settings from '@/components/svg/Settings';
import Threat from '@/components/svg/Threat';
import Tick from '@/components/svg/Tick';

interface EngineSpecs {
  version: string;
  lines: number;
  depth: number;
  threads: number;
  memory: number;
  searchTime: number;
}

interface Props {
  moves: string;
}

export default function EngineLinesPanel({ moves }: Props) {
  const [checked, setChecked] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [engine, setEngine] = useState<Engine | null>(null);
  const [engineEval, setEngineEval] = useState(0.0);
  const [engineLines, setEngineLines] = useState(['']);
  const maxDepth = useRef(0);
  const [engineSpecs, setEngineSpecs] = useState<EngineSpecs>({
    version: 'SF 16',
    searchTime: 5,
    depth: 20,
    lines: 3,
    threads: 2,
    memory: 7,
  });

  useEffect(() => {
    import('@/lib/engine').then((Engine) => {
      const engine = new Engine.Engine();
      setEngine(engine);
      console.log('here');
      engine.onMessage(
        ({
          uciMessage,
          bestMove,
          ponder,
          positionEvaluation,
          possibleMate,
          pv,
          depth,
        }: EngineMessage) => {
          console.log(uciMessage);
          pv && setEngineLines((engineLines) => [...engineLines, pv]);
        }
      );
    });
  }, []);

  useEffect(() => {
    engine?.evaluatePosition(moves);
  }, [engine, moves]);

  const handleChangeToggleEval = () => {
    setChecked(!checked);
  };

  const formatNumber = (engineEval: number) => {
    return engineEval > 0 ? '+' + engineEval.toFixed(2) : engineEval.toFixed(2);
  };

  function progressScript(event: React.ChangeEvent<HTMLInputElement>): void {
    const sliderValue =
      ((Number(event.target.value) - Number(event.target.min)) /
        (Number(event.target.max) - Number(event.target.min))) *
      100;
    event.currentTarget.style.background = `linear-gradient(to right, #0075ff ${sliderValue}%, #ccc ${sliderValue}%)`;
  }

  return (
    <div className='rounded-lg h-[800px] w-[400px] bg-[rgb(35, 34, 31)]'>
      {/* summary bar */}
      <div className='h-[41px] flex space-x-7'>
        {/* show engine checkbox*/}
        <div className='ml-[6px] flex justify-center items-center'>
          <input
            id='analyse-toggle-eval'
            className='absolute hidden'
            type='checkbox'
            checked={checked}
            onChange={handleChangeToggleEval}
          ></input>
          <label
            htmlFor='analyse-toggle-eval'
            className={cn(
              'block cursor-pointer w-10 h-6 rounded-2xl hover:shadow-[0_0_12px_rgba(107,107,107,1)]',
              {
                'bg-[#629924]': checked,
                'bg-[#6b6b6b]': !checked,
              }
            )}
          >
            {checked && (
              <div className='relative rounded-full bg-[#35322f] h-6 w-6 left-4'>
                <Tick className='absolute fill-[#629924]'></Tick>
              </div>
            )}
            {!checked && (
              <div className='relative rounded-full bg-[#35322f] h-6 w-6 left-0'>
                <Cross className='absolute fill-[#6b6b6b]'></Cross>
              </div>
            )}
          </label>
        </div>
        {/* engine eval number */}
        <div className='leading-[38px] font-bold text-gray-200 text-[1.6rem]'>
          {formatNumber(engineEval)}
        </div>
        {/* engine specs */}
        <div className='flex flex-col flex-[2_1_auto] justify-center text-gray-400 text-xs leading-[14px] whitespace-nowrap'>
          <div className='text-left'>
            <span className=''>{engineSpecs.version}</span>
            &nbsp;&#183;&nbsp;
            <span>{engineSpecs.memory + 'MB'}</span>
          </div>
          <span className='w-full text-left'>
            {'depth ' + engineSpecs.depth}
          </span>
        </div>
        <div className='flex items-center space-x-2'>
          <Threat className='fill-gray-200 stroke-gray-200 hover:fill-[#c33] hover:stroke-[#c33] cursor-pointer'></Threat>
          <div
            className={cn(
              'h-full px-2 flex flex-col justify-center items-center',
              {
                'bg-[#3692e7]': showSettingsModal,
              }
            )}
          >
            <Settings
              onClick={() => setShowSettingsModal(!showSettingsModal)}
              className={cn(
                'fill-gray-200 stroke-gray-200 hover:fill-white hover:stroke-white cursor-pointer',
                {
                  'fill-white stroke-white': showSettingsModal,
                }
              )}
            ></Settings>
          </div>
        </div>
      </div>
      <div className='relative'>
        <div
          className={cn('absolute p-5 text-left text-gray-200 w-full z-[4]', {
            'border-t-[#3692e7] border-t-2 flex flex-col gap-4':
              showSettingsModal,
            hidden: !showSettingsModal,
          })}
        >
          <div className='flex items-center gap-3'>
            <span>Engine:</span>
            <select className='border-[#606060] bg-[#262421] rounded-md px-2 py-1 w-full bg-[url(/svg/chevron-down.svg)] bg-[length:14px_14px]'>
              <option>Stockfish 16 NNUE · 67MB</option>
              <option>Komodo</option>
            </select>
          </div>
          <br />
          <div className='space-x-2'>
            <span>Search Time</span>
            <input
              className='appearance-none h-2 bg-gray-200 rounded-md slider-thumb:mt-[-14px]'
              type='range'
              min='0'
              max='8'
              list='8-detents'
              onChange={(e) =>
                setEngineSpecs((engineSpecs) => ({
                  ...engineSpecs,
                  searchTime: Number(e.target.value),
                }))
              }
              onInput={progressScript}
            />
            <span>{engineSpecs.searchTime}</span>
          </div>
          <div className='space-x-2'>
            <span>Multiple Lines</span>
            <input
              className='appearance-none h-2 bg-gray-200 rounded-md slider-thumb:mt-[-14px]'
              type='range'
              min='0'
              max='5'
              list='5-detents'
              onChange={(e) =>
                setEngineSpecs((engineSpecs) => ({
                  ...engineSpecs,
                  depth: Number(e.target.value),
                }))
              }
              onInput={progressScript}
            />
            <span>{engineSpecs.depth}</span>
          </div>
          <div className='space-x-2'>
            <span>Threads</span>
            <input
              className='appearance-none h-2 bg-gray-200 rounded-md slider-thumb:mt-[-14px]'
              type='range'
              min='2'
              max='32'
              list='30-detents'
              onChange={(e) =>
                setEngineSpecs((engineSpecs) => ({
                  ...engineSpecs,
                  threads: Number(e.target.value),
                }))
              }
              onInput={progressScript}
            />
            <span>{engineSpecs.threads}</span>
          </div>
          <div className='space-x-2'>
            <span>Memory</span>
            <input
              className='appearance-none h-2 bg-gray-200 rounded-md slider-thumb:mt-[-14px]'
              type='range'
              min='4'
              max='9'
              list='4-9-detents'
              onChange={(e) =>
                setEngineSpecs((engineSpecs) => ({
                  ...engineSpecs,
                  memory: Number(e.target.value),
                }))
              }
              onInput={progressScript}
            />
            <span>{engineSpecs.memory}</span>
          </div>
          <datalist id='8-detents'>
            <option value='0' />
            <option value='1' />
            <option value='2' />
            <option value='3' />
            <option value='4' />
            <option value='5' />
            <option value='6' />
            <option value='7' />
            <option value='8' />
          </datalist>
          <datalist id='5-detents'>
            <option value='0' />
            <option value='1' />
            <option value='2' />
            <option value='3' />
            <option value='4' />
            <option value='5' />
          </datalist>
          <datalist id='4-9-detents'>
            <option value='4' />
            <option value='5' />
            <option value='6' />
            <option value='7' />
            <option value='8' />
            <option value='9' />
          </datalist>
          <datalist id='30-detents'>
            <option value='2' />
            <option value='3' />
            <option value='4' />
            <option value='5' />
            <option value='6' />
            <option value='7' />
            <option value='8' />
            <option value='9' />
            <option value='10' />
            <option value='11' />
            <option value='12' />
            <option value='13' />
            <option value='14' />
            <option value='15' />
            <option value='16' />
            <option value='17' />
            <option value='18' />
            <option value='19' />
            <option value='20' />
            <option value='21' />
            <option value='22' />
            <option value='23' />
            <option value='24' />
            <option value='25' />
            <option value='26' />
            <option value='27' />
            <option value='28' />
            <option value='29' />
            <option value='30' />
            <option value='31' />
            <option value='32' />
          </datalist>
        </div>
      </div>
      <div className='text-left text-gray-200'>
        {engineLines.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    </div>
  );
}
