export interface Skill {
  id: string;
  name: string;
  icon?: string;
  keybind?: string;
  cooldown?: number;
}

export interface SkillBarProps {
  skills: Skill[];
  maxSlots?: number;
  className?: string;
  bindings?: Record<string, string>;
}

export function SkillBar({
  skills,
  maxSlots = 8,
  className,
  bindings,
}: SkillBarProps) {
  const rootClass = className
    ? `flex gap-2 justify-center ${className}`
    : "flex gap-2 justify-center";

  return (
    <div
      data-bui-component="SkillBar"
      data-bui-variant="horizontal"
      data-bindings={bindings ? JSON.stringify(bindings) : undefined}
      className={rootClass}
    >
      {Array.from({ length: maxSlots }, (_, i) => skills[i]).map((skill, i) =>
        skill ? (
          <div
            key={skill.id}
            className="w-12 h-12 rounded-md bg-surface border border-border flex flex-col items-center justify-center relative"
          >
            {skill.icon ? (
              <img src={skill.icon} alt="" className="w-6 h-6" />
            ) : (
              <span className="text-h3 text-text-primary font-semibold">
                {skill.name.charAt(0)}
              </span>
            )}
            {skill.cooldown && skill.cooldown > 0 && (
              <div className="absolute inset-0 bg-overlay rounded-md" />
            )}
            <span className="absolute bottom-0 right-0.5 text-caption text-text-secondary z-10">
              {skill.keybind ?? String(i + 1)}
            </span>
          </div>
        ) : (
          <div
            key={`empty-${i}`}
            className="w-12 h-12 rounded-md bg-surface-elev border border-dashed border-border flex items-center justify-center"
          />
        )
      )}
    </div>
  );
}
