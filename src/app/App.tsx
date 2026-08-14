import '../styles/index.css';
import { HealthBar } from '../components/HealthBar';
import { InventoryGrid } from '../components/InventoryGrid';
import { SkillBar } from '../components/SkillBar';
import { DialogueBox } from '../components/DialogueBox';

/**
 * Game UI Kit — showcase App.
 *
 * Pure static demo: every component rendered with the exact props from the
 * plan. No state, no event handlers, no hooks.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text-primary p-8 flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <h2 className="text-h2 font-semibold">HUD</h2>
        <div className="flex gap-8">
          <HealthBar current={75} max={100} className="flex-1" />
          <HealthBar current={60} max={100} resource="mana" className="flex-1" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-h2 font-semibold">Inventory</h2>
        <InventoryGrid
          rows={4}
          cols={6}
          items={[
            { id: 'sword', name: 'Iron Sword', rarity: 'rare', quantity: 1 },
            { id: 'shield', name: 'Round Shield', rarity: 'common', quantity: 1 },
            { id: 'potion', name: 'Health Potion', rarity: 'common', quantity: 5 },
            { id: 'helm', name: 'Dragon Helm', rarity: 'legendary', quantity: 1 },
            { id: 'orb', name: 'Arcane Orb', rarity: 'epic', quantity: 1 },
          ]}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-h2 font-semibold">Skills</h2>
        <SkillBar
          skills={[
            { id: 'strike', name: 'Strike', keybind: '1' },
            { id: 'dash', name: 'Dash', keybind: '2' },
            { id: 'shield', name: 'Barrier', keybind: '3' },
            { id: 'bolt', name: 'Bolt', keybind: '4', cooldown: 3 },
            { id: 'heal', name: 'Heal', keybind: '5' },
            { id: 'rage', name: 'Rage', keybind: '6' },
          ]}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-h2 font-semibold">Dialogue</h2>
        <DialogueBox
          speakerName="Villager"
          text="Welcome, traveler! The road ahead is dangerous."
        />
      </section>
    </div>
  );
}
