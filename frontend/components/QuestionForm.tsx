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
    <fieldset>
      <legend>Question {index + 1}</legend>

      {canRemove && (
        <button type="button" onClick={() => onRemove(question.id)}>
          Remove
        </button>
      )}

      <input
        type="text"
        value={question.text}
        onChange={handleTextChange}
        required
        placeholder={`Question ${index + 1} text`}
      />

      <select value={question.type} onChange={handleTypeChange}>
        <option value="BOOLEAN">Boolean (true / false)</option>
        <option value="INPUT">Short text answer</option>
        <option value="CHECKBOX">Checkbox (multiple correct)</option>
      </select>

      {question.type === 'BOOLEAN' && (
        <div>
          <label>
            <input
              type="radio"
              name={`correct-${question.id}`}
              checked={question.correctAnswer === true}
              onChange={() => onChange(question.id, { correctAnswer: true })}
            />
            True is correct
          </label>
          <label>
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
        />
      )}

      {question.type === 'CHECKBOX' && (
        <div>
          {(question.options ?? []).map((option, optionIndex) => (
            <div key={option.id}>
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
              />
              <button type="button" onClick={() => removeOption(option.id)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addOption}>Add option</button>
        </div>
      )}
    </fieldset>
  );
}
