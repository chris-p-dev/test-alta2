import qs from 'qs';

export function updateQuery(existing = '', changes = {}) {
  const parsed = qs.parse(existing.slice(1), {
    decode: true,
  });

  Object.entries(changes).forEach(([key, change]) => {
    switch (Object.prototype.toString.call(change)) {
      case '[object Null]': {
        delete parsed[key];
        break;
      }
      case '[object Number]':
      case '[object String]': {
        parsed[key] = sanitize(change);
        break;
      }
      case '[object Object]': {
        const { add, remove } = change;
        const current = parsed[key];

        let updated = current ? current + ',' : '';

        if (add) {
          updated += add;
        }

        if (remove) {
          const parts = updated.replace(/\s/g, '%20').split(',');
          const toRemove = parts.indexOf(remove);

          parts.splice(toRemove, 1);

          updated = parts.join(',');
        }

        updated = sanitize(updated);

        if (updated) {
          parsed[key] = updated;
        } else {
          delete parsed[key];
        }

        break;
      }
      default: {
        throw new Error(
          `Expected changes to be an object of: Strings, Nulls, or Objects. Not: ${typeof change}`,
        );
      }
    }
  });

  return qs.stringify(parsed, {
    encode: false,
  });
}

export function parseSearch(str) {
  return qs.parse(str.slice(1));
}

function sanitize(value) {
  return (value + '')
    .replace(/((?:^,+)|(?:,+$))/g, '') // remove leading/trailing comma
    .replace(/(\w),{2}(\w)/g, '$1,$2'); // remove doubled commas
}
