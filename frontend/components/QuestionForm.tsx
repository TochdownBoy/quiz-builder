import type { ChangeEvent } from 'react';
import type { Option, Question, QuestionType } from '@/types/quiz';

interface QuestionFormProps {
  index: number;
  question: Question;
  canRemove: boolean;
  onChange: (id: string, changes: Partial<Question>) => void;
  onRemove: (id: string) => void;
}

function createEmptyOption(): Option {
  return {
    id: crypto.randomUUID(),
    text: '',
    isCorrect: false,
  };
}

export default function QuestionForm({
  index,
  question,
  canRemove,
  onChange,
  onRemove,
}: QuestionFormProps) {
  function handleTextChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(question.id, { text: event.target.value });
  }

  function handleTypeChange(event: ChangeEvent<HTMLSelectElement>) {
    onChange(question.id, { type: event.target.value as QuestionType });
  }

  function addOption() {
    const options = question.options ?? [];
    onChange(question.id, { options: [...options, createEmptyOption()] });
  }

  function updateOption(optionId: string, changes: Partial<Option>) {
    const options = question.options ?? [];
    onChange(question.id, {
      options: options.map((option) =>
        option.id === optionId ? { ...option, ...changes } : option,
      ),
    });
  }

  function removeOption(optionId: string) {
    const options = question.options ?? [];
    onChange(question.id, {
      options: options.filter((option) => option.id !== optionId),
    });
  }

  return (
    <fieldset className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-2">
        <legend className="text-sm font-semibold text-slate-500">
          Question {index + 1}
        </legend>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(question.id)}
            className="text-sm font-medium text-red-600 hover:text-red-500"
          >
            Remove
          </button>
        )}
      </div>

      <input
        type="text"
        value={question.text}
        onChange={handleTextChange}
        required
        placeholder={`Question ${index + 1} text`}
        className="mt-3 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
      />

      <select
        value={question.type}
        onChange={handleTypeChange}
        className="mt-2 rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
      >
        <option value="BOOLEAN">Boolean (true / false)</option>
        <option value="INPUT">Short text answer</option>
        <option value="CHECKBOX">Checkbox (multiple correct)</option>
      </select>

      <div className="mt-3">
        {question.type === 'BOOLEAN' && (
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`correct-${question.id}`}
                checked={question.correctAnswer === true}
                onChange={() => onChange(question.id, { correctAnswer: true })}
              />
              True is correct
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`correct-${question.id}`}
                checked={question.correctAnswer === false}
                onChange={() => onChange(question.id, { correctAnswer: false })}
              />
              False is correct
            </label>
          </div>
        )}

        {question.type === 'INPUT' && (
          <input
            type="text"
            value={question.answer ?? ''}
            onChange={(event) =>
              onChange(question.id, { answer: event.target.value })
            }
            required
            placeholder="Correct answer"
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
          />
        )}

        {question.type === 'CHECKBOX' && (
          <div className="space-y-2">
            {(question.options ?? []).map((option, optionIndex) => (
              <div key={option.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={option.isCorrect}
                  onChange={(event) =>
                    updateOption(option.id, { isCorrect: event.target.checked })
                  }
                  title="Mark as correct"
                />
                <input
                  type="text"
                  value={option.text}
                  onChange={(event) =>
                    updateOption(option.id, { text: event.target.value })
                  }
                  required
                  placeholder={`Option ${optionIndex + 1}`}
                  className="flex-1 rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeOption(option.id)}
                  className="text-sm font-medium text-red-600 hover:text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Add option
            </button>
          </div>
        )}
      </div>
    </fieldset>
  );
}
