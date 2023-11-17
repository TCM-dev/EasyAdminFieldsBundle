<?php

namespace Insitaction\EasyAdminFieldsBundle\DTO;

final class MaskFieldOptions
{
    // TODO MERGE ou INTERSECT
    public const IDENTIFIER_TYPE_LABEL = 'label';
    public const IDENTIFIER_TYPE_VALUE = 'value';

    private string $multipleSelectMode = 'value';
    /**
     * @var array<{value: string, fields: array<string>}>
     */
    private array $map;

    public function serialize(): array
    {
        return [
            'map' => $this->getMap(),
            'identifierType' => $this->getMultipleSelectMode(),
        ];
    }

    public static function new(): self
    {
        return new self();
    }

    public function addMap(string $value, array $fields): self
    {
        $this->map[] = [
            'value' => $value,
            'fields' => $fields
        ];

        return $this;
    }

    /**
     * @return array<{value: string, fields: array<string>}>
     */
    public function getMap(): array
    {
        return $this->map;
    }

    public function setMultipleSelectMode(string $multipleSelectMode): self
    {
        $this->multipleSelectMode = $multipleSelectMode;

        return $this;
    }

    public function getMultipleSelectMode(): string
    {
        return $this->multipleSelectMode;
    }
}
