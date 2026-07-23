"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = paginate;
async function paginate(model, filter, query) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const sortBy = query.sortBy ?? 'createdAt';
    const sortOrder = query.sortOrder === 'asc' ? 1 : -1;
    const [data, total] = await Promise.all([
        model
            .find(filter)
            .sort({ [sortBy]: sortOrder })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec(),
        model.countDocuments(filter).exec(),
    ]);
    return { data, total, page, limit };
}
//# sourceMappingURL=paginate.js.map